import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from 'src/entities/post.entity';
import { postDTO } from 'src/dto/post.dto';

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


    @Post('/createPost')
    createPost(@Body() post: postDTO) : Promise<Object>{
        return this.postService.createPost(post)
    }


    @Delete('/postDelete/:id')
    deletePost(@Param() id: number) : Promise<Object>{
        return this.postService.deletePost(id)
    }



}
