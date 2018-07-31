import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vote } from './interfaces/vote.interface';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VotesService {
  constructor(@InjectModel('Vote') private readonly voteModel: Model<Vote>) { }

  async addVote(createVoteDto: CreateVoteDto): Promise<Vote> {
    const foundVote = await this.voteModel.findOne({
      userId: createVoteDto.userId,
      articleId: createVoteDto.articleId,
    }).exec();
    if (foundVote)
      return await this.voteModel.findOneAndUpdate({
        userId: createVoteDto.userId,
        articleId: createVoteDto.articleId,
      }, createVoteDto).exec();
    const createdVote = new this.voteModel(createVoteDto);
    return await createdVote.save();
  }
}
