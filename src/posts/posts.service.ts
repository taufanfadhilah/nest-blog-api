import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

// interfaces
import { IPost } from './interfaces';

@Injectable()
export class PostsService {
  private posts: IPost[] = [];
  create(createPostDto: CreatePostDto) {
    const data = {
      ...createPostDto,
      id: this.posts.length + 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.posts.push(data);
    return this.findOne(data.id);
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    return this.posts.find((post) => post.id === id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      return null;
    }

    const { user_id, content, title } = updatePostDto;
    post.user_id = user_id;
    post.content = content;
    post.title = title;
    post.updated_at = new Date();

    return post;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
