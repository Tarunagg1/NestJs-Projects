import { Body, Controller, Get, Inject, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CurrentUser } from "../auth/current-user.decorator";
import type { UserContext } from "../auth/auth.types";
import { mapRpcErrorToHttp } from "app/rpc";
import { firstValueFrom } from "rxjs";
import { FileInterceptor } from "@nestjs/platform-express";

type Product = {
    _id?: string;
    name: string;
    description: string;
    price: number;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    imageUrl?: string;
    createdByClearkUserID: string | undefined;
}

@Controller("products")
export class ProductsHttpController {
    constructor(
        @Inject("CATALOG_CLIENT") private readonly catalogClient: ClientProxy,
        @Inject("MEDIA_CLIENT") private readonly mediaClient: ClientProxy
    ) { }


    @Post()
    @UseInterceptors(
        FileInterceptor("image", {
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB
            }
        })
    )
    async create(
        @CurrentUser() user: UserContext,
        @UploadedFile() file: Express.Multer.File | undefined,
        @Body() body: {
            name: string;
            description: string;
            price: number;
            status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
        }
    ) {
        // upload
        let imageUrl: string | undefined = undefined;
        let mediaId: string | undefined = undefined;
        let product: Product;

        if (file) {
            const base64 = file.buffer.toString("base64");
            try {
                const media = await firstValueFrom(this.mediaClient.send("media.uploadProductImages", {
                    fileName: file.originalname,
                    mimeType: file.mimetype,
                    base64,
                    uploadByUserId: user.clerkUserId,
                }));
                imageUrl = media.url;
                mediaId = media.id;
            } catch (error) {
                mapRpcErrorToHttp(error);
            }
        }

        const paylload: Product = {
            name: body.name,
            description: body.description,
            price: Number(body.price),
            status: body.status || "DRAFT",
            imageUrl: imageUrl,
            createdByClearkUserID: user.clerkUserId,
        }

        try {
            product = await firstValueFrom(this.catalogClient.send("catalog.create_product", paylload));
        } catch (error) {
            console.log(error);
            mapRpcErrorToHttp(error);
        }


        // attach media to product
        if (mediaId) {
            try {
                await firstValueFrom(this.mediaClient.send("media.attachToProduct", {
                    mediaId,
                    productId: String(product._id),
                    attachByUserId: user.clerkUserId,
                }));
            } catch (error) {
                mapRpcErrorToHttp(error);
            }
        }

        return product;
    }

    @Get()
    async findAll() {
        try {
            const products = await firstValueFrom(this.catalogClient.send("catalog.list_products", {}));
            return products;
        } catch (error) {
            mapRpcErrorToHttp(error);
        }
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        console.log(id);

        try {
            const product = await firstValueFrom(this.catalogClient.send("catalog.get_product", { id }));
            return product;
        } catch (error) {
            mapRpcErrorToHttp(error);
        }
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() body: Product) {
        try {
            const updatedProduct = await firstValueFrom(this.catalogClient.send("catalog.update_product", { id, ...body }));
            return updatedProduct;
        } catch (error) {
            mapRpcErrorToHttp(error);
        }
    }
}
