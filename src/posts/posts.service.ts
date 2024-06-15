import { Injectable, InternalServerErrorException, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postRepository : Repository<Posts>
        
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


}
