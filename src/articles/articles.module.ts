import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './schemas/article.schema';
import { CommentsModule } from '../comments/comments.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]), CommentsModule],
    controllers: [ArticlesController],
    providers: [ArticlesService],
})
export class ArticlesModule { }
