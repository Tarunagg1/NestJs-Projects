import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail({},{ message: "Invalid email format" })
    @IsNotEmpty({ message: "Email is required" })
    email: string;
    @IsNotEmpty({ message: "Password is required" })
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    @IsString({ message: "Password must be a string" })
    password: string;
    @IsNotEmpty({ message: "Name is required" })
    name: string;
}