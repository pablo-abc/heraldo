import { Controller, Get, Post, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

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

    @Delete(':id')
    @HttpCode(204)
    deleteById(@Param('id') id) {
        this.articlesService.deleteById(id);
    }
}
