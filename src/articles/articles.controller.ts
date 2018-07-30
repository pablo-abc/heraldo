import { Controller, Get, Post, Delete, Body, Query, Param, HttpCode, UseGuards, Req, Patch, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { Comment } from '../comments/interfaces/comment.interface';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { FindCommentsDto } from 'comments/dto/find-comment.dto';
import { PatchArticleDto } from './dto/patch-article.dto';
import { FindArticleDto } from './dto/find-article.dto';
import { Validator } from 'class-validator';
const validator = new Validator();

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly commentsService: CommentsService,
  ) { }

  @Get()
  findAll(@Query() query: FindArticleDto): Promise<Article[]> {
    const { limit, ...rest } = query;
    return this.articlesService.findAll(rest, limit);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Article> {
    if (!validator.isMongoId(id)) throw new NotFoundException('Article does not exist');
    return this.articlesService.findById(id);
  }

  @Get(':articleId/comments')
  findComments(@Param() findCommentDto: FindCommentsDto): Promise<Comment[]> {
    return this.commentsService.findAll(findCommentDto);
  }

  @Roles('user')
  @UseGuards(RolesGuard)
  @Patch(':id')
  patch(@Body() patchArticleDto: PatchArticleDto, @Param('id') id: string): Promise<Article> {
    return this.articlesService.patchById(id, patchArticleDto);
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
