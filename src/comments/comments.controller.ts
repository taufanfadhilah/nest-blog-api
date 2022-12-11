import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Res() res: Response) {
    const comment = this.commentsService.create(createCommentDto);

    if (!comment) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Can not create comment, post not found',
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Comment created successfully',
      data: comment,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = this.commentsService.remove(+id);
    if (!isDeleted) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Comment not found',
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  }
}
