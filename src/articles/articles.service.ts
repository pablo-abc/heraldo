import { Injectable } from '@nestjs/common';
import { Article } from './interfaces/article.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
    constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) { }

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const createdArticle = new this.articleModel(createArticleDto);
        return await createdArticle.save();
    }

    async findAll(): Promise<Article[]> {
        return await this.articleModel.find().exec();
    }

    async findById(id: string): Promise<Article> {
        return await this.articleModel.findById(id).exec();
    }

    deleteById(id: string) {
        this.articleModel.findByIdAndDelete(id).exec();
    }
}
