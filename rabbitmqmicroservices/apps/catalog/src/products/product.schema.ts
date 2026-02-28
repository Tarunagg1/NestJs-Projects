import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
    timestamps: true,
})

export class Product {

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    description!: string;


    @Prop({ required: true })
    price!: number;

    @Prop({ required: true, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' })
    status: ProductStatus = 'DRAFT';

    @Prop({ required: false })
    imageUrl!: string;

    @Prop({ required: false })
    createdByClearkUserID!: string;

}


export const ProductSchema = SchemaFactory.createForClass(Product);
