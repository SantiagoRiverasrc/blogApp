import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Posts } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Posts,User])
  ],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule {}
