import { Controller, Get, Post, Delete, Body, Param, HttpCode, UseGuards, Req } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { Comment } from '../comments/interfaces/comment.interface';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly commentsService: CommentsService,
  ) { }

  @Get()
  findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findById(id);
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Req() req): Promise<Article> {
    return this.articlesService.create(createArticleDto, req);
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @Post(':id/comments')
  addComment(@Body() createCommentDto: CreateCommentDto, @Param('id') id: string, @Req() req): Promise<Comment> {
    return this.commentsService.create(createCommentDto, req, id);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteById(@Param('id') id: string) {
    this.articlesService.deleteById(id);
  }
}
