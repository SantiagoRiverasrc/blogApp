import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { userDTO } from 'src/dto/user.dto';
import { userUpdateDTO } from 'src/dto/userUpdate.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService) {}


    
    @Get('/getUsers')
    @ApiOperation({ summary: 'Obtener todos los usuarios'})
    @ApiResponse({ status: 200, description:'Lista de usuarios'})
    @ApiResponse({ status: 500, description: 'Ha sucedido un error interno en el servidor'})
    getUsers() : Promise<User[]>{
        return this.usersService.getUser()
    }

    @Get('/getUsers/:id')
    @ApiOperation({ summary: 'Obtener un usuario a partir de un id'})
    @ApiResponse({ status: 200, description: 'Retorna un solo usuario con el id pasado'})
    @ApiResponse({ status: 404, description:'Retorna mensaje Not Found debido a que el usuario no existe con el id pasado'})
    @ApiResponse({ status: 500, description: 'Ha sucedido un error interno en el servidor'})
    getUserId(@Param('id') id: number): Promise<Object>{
        return this.usersService.getUserById(id)
    }

    @Post('/createUser')
    @ApiOperation({ summary: 'Crear un usuario'})
    @ApiResponse({ status: 201, description: 'Cuando un usuario se crea con exito'})
    @ApiResponse({ status: 409, description:'El Usuario no puede ser creado porque ya existen usuarios registrados con correos y nombres ya existentes'})
    @ApiResponse({ status: 500, description: 'Ha sucedido un error interno en el servidor'})
    createUser(@Body() userCreate: userDTO) : Promise<Object>{
        const response = this.usersService.createUser(userCreate)

        return response
    }

    @Put('/updateUser/:id')
    @ApiOperation({ summary: 'Actualizar un usuario a partir de un id'})
    updateUser(@Param('id') id: number, @Body() userUpdate : userUpdateDTO) : Promise<Object>{
        return this.usersService.updateUser(id, userUpdate)
    }


    @Delete('/deleteUser/:id')
    @ApiOperation({ summary: 'Eliminar un usuario a partir de un id'})
    deleteUser(@Param('id') id: number) : Promise<Object>{
        return this.usersService.deleteUser(id)
    }

}
