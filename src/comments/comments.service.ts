import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) { }

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const createdComment = new this.commentModel(createCommentDto);
        return await createdComment.save();
    }

    async findAll(): Promise<Comment[]> {
        return await this.commentModel.find().exec();
    }
}
