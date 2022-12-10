import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Response } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    const post = this.postsService.create(createPostDto);
    return {
      success: true,
      message: 'Post created successfully',
      data: post,
    };
  }

  @Get()
  findAll() {
    const posts = this.postsService.findAll();
    return {
      success: true,
      message: 'Get all posts',
      data: posts,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const post = this.postsService.findOne(+id);
    return {
      success: true,
      message: 'Get a post',
      data: post,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Res() res: Response,
  ) {
    const post = this.postsService.update(+id, updatePostDto);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
        data: null,
      });
    }
    return {
      success: true,
      message: 'Post updated successfully',
      data: post,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = this.postsService.remove(+id);
    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  }
}
