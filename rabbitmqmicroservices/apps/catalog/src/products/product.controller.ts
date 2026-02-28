import { Controller } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreatreProductDto } from "./product.dto";

@Controller()
export class ProductController {
    constructor(
        private readonly productsService: ProductsService
    ) { }

    @MessagePattern('catalog.create_product')
    create(@Payload() input: CreatreProductDto) {
        return this.productsService.createNewProduct(input);
    }


    @MessagePattern('catalog.list_products')
    getAll() {
        return this.productsService.getAllProducts();
    }

    @MessagePattern('catalog.get_product')
    getById(@Payload() payload: { id: string }) {
        console.log(payload.id);

        return this.productsService.getProductById(payload.id);
    }

    @MessagePattern('catalog.update_product')
    update(@Payload() data: { id: string, input: CreatreProductDto }) {
        return this.productsService.updateProduct(data.id, data.input);
    }
}