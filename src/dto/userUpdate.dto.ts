import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength,IsEmail, IsOptional } from "class-validator";



export class userUpdateDTO{

    @ApiProperty({
        description: 'Nombre de usuario para actualizar',
        example: 'Rodolfo'
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    name_user?:string

    @ApiProperty({
        description: 'Correo del usuario para actualizar',
        example: 'rodol@gmail.com'
    })
    @IsOptional()
    @IsEmail()
    @IsString()
    @MinLength(1)
    email?: string;


    @ApiProperty({
        description:'Contraseña para actualizar del usuario',
        example: 'R4%112_'
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    pass?: string

    @ApiProperty({
        description: 'Imagen de perfil del usuario para actualizar',
        example: 'htttps://img.jpg'
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    img?:string
}