import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";



export class userDTO{
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    name_user: string;


    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @MinLength(1)
    email: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    pass: string
}