import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateEventDto {
    @IsNotEmpty({ message: "Title is required" })
    @MaxLength(200, { message: "Title can be at most 200 characters long" })
    title: string;

    @IsString({ message: "Description must be a string" })
    @IsOptional()
    description: string;

    @IsNotEmpty({ message: "Date is required" })
    @IsDateString({}, { message: "Date must be a valid ISO 8601 date string" })
    date: Date;

    @IsNotEmpty({ message: "Location is required" })
    @MaxLength(255, { message: "Location can be at most 255 characters long" })
    @IsString({ message: "Location must be a string" })
    location: string;

    @IsInt({ message: "Capacity must be an integer" })
    @Min(1, { message: "Capacity must be at least 1" })
    capacity: number;

    @IsInt({ message: "Price must be an integer" })
    @Min(0, { message: "Price cannot be negative" })
    @IsOptional()
    price: number;
}