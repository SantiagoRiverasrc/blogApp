import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resourceUsage } from 'process';
import { userDTO } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { userUpdateDTO } from 'src/dto/userUpdate.dto';

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


    async getUserById(id: number) : Promise<Object>{
        try{
            const user = await this.userRepository.findOneBy({ id_user: id})

            if(!user){
                throw new NotFoundException('User does not exist')
            }
    
            const { id_user, name_user, email, img} = user;

            return {
                id_user: id_user,
                name_user: name_user,
                email: email,
                img: img
            }
        }catch(err){
            if(err instanceof NotFoundException){
                throw err
            }

            throw new InternalServerErrorException('Error in the server')
        }
    }


    async createUser(user: userDTO) : Promise<Object>{
        try{
            const { name_user, email, pass } = user

            const userNameExist = await this.userRepository.findOneBy({name_user: name_user})

            if(userNameExist){
                throw new ConflictException('Username alredy exists')
            }

            const userEmailExist = await this.userRepository.findOneBy({email: email})

            if(userEmailExist){
                throw new ConflictException('Email alredy exist')
            }

            const passwordHash = await bcrypt.hash(pass, 10)
            
    
            let newUser = {
                name_user: name_user,
                email: email,
                pass: passwordHash
            }
    
            await this.userRepository.save(newUser)

            if(newUser.hasOwnProperty('pass')){
                delete newUser.pass
            }
    
            return { create: newUser, message: "User create success"}
        }catch(err){
            if(err instanceof ConflictException){
                throw err
            }

            throw new InternalServerErrorException('Error in the server')
        }
    }


    async updateUser(id: number,userUpdate: userUpdateDTO): Promise<Object>{

        try{
            const { name_user,email,pass,img } = userUpdate
    
            const user = await this.userRepository.findOneBy({ id_user: id})
    
            if(!user){
                throw new NotFoundException('User does not exist')
            }

            if(name_user){
                user.name_user = name_user
            }

            if(email){
                user.email = email
            }

            if(img){
                user.img = img
            }

            if(pass){
                let passHash = await bcrypt.hash(pass, 10)

                user.pass = passHash
            }
            

            await this.userRepository.save(user)

            
            return { message: "User update"}

        }catch(err){
            if(err instanceof NotFoundException){
                throw err
            }


            throw new InternalServerErrorException('Error in the server')
        }
        
    }



    async deleteUser(id: number): Promise<Object>{
        try{
            const userDelete = await this.userRepository.delete({ id_user: id})

            if(userDelete.affected === 0){
                throw new NotFoundException('User does not exist')
            }


            return { message: "User delete success"}
        }catch(err){
            if(err instanceof NotFoundException){
                throw err
            }

            throw new InternalServerErrorException('Error in the')
        }
    }
}
