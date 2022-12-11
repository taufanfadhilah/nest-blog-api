import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IComment } from './interfaces';

@Injectable()
export class CommentsService {
  private comments: IComment[] = [];

  private getNewId() {
    const commentLength = this.comments.length;
    return this.comments[commentLength - 1]?.id + 1 || 1;
  }

  create(createCommentDto: CreateCommentDto) {
    const comment: IComment = {
      ...createCommentDto,
      id: this.getNewId(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.comments.push(comment);
    return comment;
  }

  remove(id: number) {
    const commentIndex = this.comments.findIndex(
      (comment) => comment.id === id,
    );

    if (commentIndex === -1) {
      return false;
    }

    this.comments.splice(commentIndex, 1);
    return true;
  }
}