import { IsNotEmpty, IsString, MinLength,IsEmail, IsOptional } from "class-validator";



export class userUpdateDTO{

    @IsString()
    @MinLength(1)
    @IsOptional()
    name_user?:string

    @IsOptional()
    @IsEmail()
    @IsString()
    @MinLength(1)
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    pass?: string
}