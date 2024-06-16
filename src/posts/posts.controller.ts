import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from 'src/entities/post.entity';

@Controller('posts')
export class PostsController {
    constructor(private postService : PostsService) {}

    @Get('/getAllPosts')
    getPosts() : Promise<Posts[]> {
        return this.postService.getPosts()
    }


    @Get('/getPostByUser/:id')
    getByUserPost(@Param('id') id: number){
        return this.postService.getPostByUser(id)
    }



}
