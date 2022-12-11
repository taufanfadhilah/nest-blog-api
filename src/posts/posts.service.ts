import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CommentsService } from 'src/comments/comments.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

// interfaces
import { IPost } from './interfaces';

@Injectable()
export class PostsService {
  constructor(
    @Inject(forwardRef(() => CommentsService))
    private commentService: CommentsService,
  ) {}

  private posts: IPost[] = [];
  create(createPostDto: CreatePostDto) {
    const data: IPost = {
      ...createPostDto,
      id: this.posts.length + 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.posts.push(data);
    return this.findOne(data.id);
  }

  findAll() {
    return this.posts.map((comment) => ({
      ...comment,
      comments: this.commentService.findByPostId(comment.id),
    }));
  }

  findOne(id: number) {
    const comment = this.posts.find((post) => post.id === id);
    if (!comment) {
      return false;
    }
    comment.comments = this.commentService.findByPostId(comment.id);
    return comment;
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
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      return false;
    }

    this.posts.splice(postIndex, 1);
    this.commentService.removeByPostId(id);
    return true;
  }
}
