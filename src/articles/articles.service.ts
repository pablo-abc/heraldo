import { Injectable } from '@nestjs/common';
import { Article } from './interfaces/article.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) { }

  async create(createArticleDto: CreateArticleDto, req): Promise<Article> {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.decode(token);
    const createdArticle = new this.articleModel(createArticleDto);
    createdArticle.author = user._id;
    return await createdArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  async findById(id: string): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }

  async deleteById(id: string) {
    await this.articleModel.findByIdAndDelete(id).exec();
  }
}
