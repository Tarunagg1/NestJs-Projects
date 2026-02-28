import { IsNumber, IsOptional, IsString } from "class-validator";

export class ProductCreateDto {
    @IsString()
    productId!: string;

    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsNumber()
    price!: number;

    @IsString()
    status!: "ACTIVE" | "DRAFT";

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsString()
    createdByClerkUserId!: string;
}