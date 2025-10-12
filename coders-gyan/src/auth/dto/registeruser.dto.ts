import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class RegisterDTO {

    @IsString()
    fname: string

    @IsString()
    lname: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}