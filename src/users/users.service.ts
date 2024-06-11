import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resourceUsage } from 'process';
import { userDTO } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>
    ) {}


    async getUser(): Promise<User[]>{
        try{
            const users = await this.userRepository.find()      
            
            return users
        }catch(err){
            throw new InternalServerErrorException('Error in the server')
        }
    }


    async getUserById(id: number) : Promise<User>{
        try{
            const user = await this.userRepository.findOneBy({ id_user: id})
    
            return user;
        }catch(err){
            throw new InternalServerErrorException('Error in the server')
        }
    }


    async createUser(user: userDTO) : Promise<Object>{
        try{
            const { name_user, email, pass } = user
    
            let newUser = {
                name_user: name_user,
                email: email,
                pass: pass
            }
    
            await this.userRepository.save(newUser)
    
            return { create: newUser, message: "User create success"}
        }catch(err){
            throw new InternalServerErrorException('Error in the server')
        }
    }
}
