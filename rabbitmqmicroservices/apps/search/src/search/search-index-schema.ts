import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type SearchProductDocument = HydratedDocument<SearchProduct>;


@Schema({ timestamps: true })
export class SearchProduct {
    @Prop({ required: true, unique: true, index: true })
    productId!: string;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    price!: number;

    @Prop({ required: true, enum: ["ACTIVE", "DRAFT"], default: "ACTIVE" })
    status!: "ACTIVE" | "DRAFT";

    @Prop({ required: true })
    normalizeText!: string;
}

export const SearchProductSchema = SchemaFactory.createForClass(SearchProduct);