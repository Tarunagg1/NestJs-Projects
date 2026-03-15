import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateUserInput } from "./create-user-input";
import { IsEnum, IsOptional } from "class-validator";
import { Role } from "src/enums/role.enum";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @IsOptional()
    @IsEnum(Role)
    @Field(() => Role, { nullable: true })
    role?: Role;
}