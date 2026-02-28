import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./product.schema";
import { isValidObjectId, Model } from "mongoose";
import { CreatreProductDto } from "./product.dto";
import { rpcBadRequest } from "app/rpc";
import { ProductEventPubliser } from "../events/product-events.publisher";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
        private readonly productEventPublisher: ProductEventPubliser
    ) { }
    private mapCatalogStatusToSearchStatus(status: Product["status"]): "ACTIVE" | "DRAFT" {
        return status === "PUBLISHED" ? "ACTIVE" : "DRAFT";
    }

    async createNewProduct(input: CreatreProductDto): Promise<Product> {
        if (!input.name || !input.description || input.price === undefined) {
            rpcBadRequest('Missing required fields: name, description, price');
        }
        const createdProduct = new this.productModel(input);
        const saved = await createdProduct.save();
        // Publish product created event
        await this.productEventPublisher.productCreatedEvent({
            productId: saved._id.toString(),
            name: saved.name,
            description: saved.description,
            price: saved.price,
            status: this.mapCatalogStatusToSearchStatus(saved.status),
            imageUrl: saved.imageUrl,
            createdByClerkUserId: saved.createdByClearkUserID
        });

        return saved.toObject();
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productModel.find().lean().exec();
    }

    async getProductById(id: string): Promise<Product | null> {
        if (!isValidObjectId(id)) {
            rpcBadRequest('Invalid product ID');
        }
        return this.productModel.findById(id).lean().exec();
    }

    async updateProduct(id: string, input: CreatreProductDto): Promise<Product | null> {
        if (!input.name || !input.description || input.price === undefined) {
            rpcBadRequest('Missing required fields: name, description, price');
        }
        return this.productModel.findByIdAndUpdate(id, input, { new: true }).lean().exec();
    }


}