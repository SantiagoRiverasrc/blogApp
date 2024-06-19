import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";



export class userDTO{
    @ApiProperty({
        description:'Nombre del usuario',
        example: 'Isis'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    name_user: string;


    @ApiProperty({
        description:'Correo del usuario',
        example: 'isisc@gmail.com'
    })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @MinLength(1)
    email: string;


    @ApiProperty({
        description:'Contraseña del usuario',
        example: 'isis_3575!'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    pass: string
}