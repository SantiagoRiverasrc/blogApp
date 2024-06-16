import { Injectable, InternalServerErrorException, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { postDTO } from 'src/dto/post.dto';
import { Posts } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';

import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postRepository : Repository<Posts>,
        
        @InjectRepository(User)
        private userRepository : Repository<User>
    ) {}


    async getPosts() : Promise<Posts[]>{
        try{
            let posts = await this.postRepository.find()

            return posts
        }catch(err){
            throw new InternalServerErrorException('Error in the server')
        }
    }


    async getPostByUser(id: number) : Promise<Posts>{
        try{
            const userPost = await this.postRepository.findOneBy({ iduser: id})

            if(!userPost){
                throw new NotFoundException('User does not exist')
            }

            return userPost
        }catch(err){
            if(err instanceof NotFoundException){
                throw err
            }

            throw new InternalServerErrorException('Error in the server')
        }
    }


    async createPost(post: postDTO) : Promise<Object>{
        const { iduser, title, content } = post

        try{
            const userExist = await this.userRepository.findOneBy({ id_user: iduser})

            if(!userExist){
                throw new NotFoundException(`The relation with the user of id: ${iduser}, It Can't because user does not exists`)
            }

            const newPost = {
                iduser: iduser,
                title: title,
                content: content
            }

            await this.postRepository.save(newPost)

            return { Create: newPost, message: "Post create success"}

        }catch(e){
            if(e instanceof NotFoundException){
                throw e
            }

            throw new InternalServerErrorException('Error in the server')
        }
        
        
    }







    async deletePost(id: number) : Promise<Object>{
        try{
            const userDelete = await this.userRepository.delete({ id_user: id})



            if(userDelete.affected === 0){
                throw new NotFoundException(`User with id ${id} does not exist`)
            }


            return { message: `User with id ${id} delete success`}

        }catch(e){
            if(e instanceof NotFoundException){
                throw e
            }

            throw new InternalServerErrorException('Error in the server')
        }
    }


}
