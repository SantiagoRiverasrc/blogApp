import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { userDTO } from 'src/dto/user.dto';
import { userUpdateDTO } from 'src/dto/userUpdate.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService) {}


    
    @Get('/getUsers')
    @ApiOperation({ summary: 'Obtener todos los usuarios'})
    getUsers() : Promise<User[]>{
        return this.usersService.getUser()
    }

    @Get('/getUsers/:id')
    @ApiOperation({ summary: 'Obtener todos los usuarios a partir de un id'})
    getUserId(@Param('id') id: number): Promise<Object>{
        return this.usersService.getUserById(id)
    }

    @Post('/createUser')
    @ApiOperation({ summary: 'Crear un usuario'})
    createUser(@Body() userCreate: userDTO) : Promise<Object>{
        const response = this.usersService.createUser(userCreate)

        return response
    }

    @Put('/updateUser/:id')
    @ApiOperation({ summary: 'Actualizar un usuario'})
    updateUser(@Param('id') id: number, @Body() userUpdate : userUpdateDTO) : Promise<Object>{
        return this.usersService.updateUser(id, userUpdate)
    }


    @Delete('/deleteUser/:id')
    deleteUser(@Param('id') id: number) : Promise<Object>{
        return this.usersService.deleteUser(id)
    }

}
