import { IsNotEmpty, IsString, MinLength,IsEmail } from "class-validator";



export class userUpdateDTO{
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    name_user?:string

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @MinLength(1)
    email?: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    pass?: string
}