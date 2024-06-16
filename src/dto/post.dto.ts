import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class postDTO{
    @IsNumber()
    @IsNotEmpty()
    iduser: number;


    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

}