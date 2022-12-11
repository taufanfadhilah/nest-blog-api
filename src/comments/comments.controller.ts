import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
    @Res() res: Response,
  ) {
    const data: CreateCommentDto = createCommentDto;
    data.user_id = req.user.id;
    const comment = this.commentsService.create(data);

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
