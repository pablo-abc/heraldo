import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './interfaces/comment.interface';
import { Roles } from 'decorators/roles.decorator';
import { RolesGuard } from 'guards/roles.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }
}
