import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsStrongPassword()
    password: string;

    @IsString()
    @IsEmail()
    email: string;
}