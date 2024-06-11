import { Body, Get, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { userDTO } from 'src/dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService) {}


    @Get('/getUsers')
    getUsers() : Promise<User[]>{
        return this.usersService.getUser()
    }

    @Get('/getUsers/:id')
    getUserId(@Param('id') id: number): Promise<User>{
        return this.usersService.getUserById(id)
    }

    @Post('/createUser')
    createUser(@Body() userCreate: userDTO) : Promise<Object>{
        const response = this.usersService.createUser(userCreate)

        return response
    }

}
