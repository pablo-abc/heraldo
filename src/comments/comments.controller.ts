import { Controller, Get, Post, Body, UseGuards, Req, Param, BadRequestException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './interfaces/comment.interface';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Validator } from 'class-validator';
const validator = new Validator();

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
  create(@Body() createCommentDto: CreateCommentDto, @Req() req): Promise<Comment> {
    return this.commentsService.create(createCommentDto, req);
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @Post(':id')
  deleteById(@Param('id') id: string): void {
    if (!validator.isMongoId(id)) throw new BadRequestException();
    this.commentsService.deleteById(id);
  }
}
