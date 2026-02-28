import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import type { ProductStatus } from "./product.schema";

export class CreatreProductDto {
    @IsString()
    name!: string;
    @IsString()
    description!: string;
    @IsNumber()
    @Min(0)
    price!: number;

    @IsOptional()
    @IsString()
    status?: ProductStatus;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsString()
    createdByClearkUserID?: string;
}


export class GetProductByIdDto {
    @IsString()
    id!: string;
}




