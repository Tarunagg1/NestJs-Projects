import { InputType, Field, PartialType, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateBookInput } from "./create-book.input";

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
   @Field(() => ID)
    @IsNotEmpty()
    id: string;
}

