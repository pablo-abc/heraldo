import { Controller, Get, Post, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { Comment } from '../comments/interfaces/comment.interface';

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
    findById(@Param('id') id): Promise<Article> {
        return this.articlesService.findById(id);
    }

    @Post()
    create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
        return this.articlesService.create(createArticleDto);
    }

    @Post(':id/comments')
    addComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.commentsService.create(createCommentDto);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteById(@Param('id') id) {
        this.articlesService.deleteById(id);
    }
}
