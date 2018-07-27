import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './interfaces/comment.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) { }

  async create(createCommentDto: CreateCommentDto, req, article?: string): Promise<Comment> {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.decode(token);
    const comment = new CreateCommentDto(
      article || createCommentDto.article,
      createCommentDto.text,
      user._id,
    );
    const createdComment = new this.commentModel(comment);
    createdComment.userId = user._id;
    return await createdComment.save();
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentModel.find().exec();
  }
}
