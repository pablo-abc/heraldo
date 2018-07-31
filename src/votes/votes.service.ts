import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vote } from './interfaces/vote.interface';
import { CreateVoteDto } from './dto/create-vote.dto';
import { FindVoteDto } from './dto/find-vote.dto';

@Injectable()
export class VotesService {
  constructor(@InjectModel('Vote') private readonly voteModel: Model<Vote>) { }

  async addVote(createVoteDto: CreateVoteDto): Promise<Vote> {
    const foundVote = await this.voteModel.findOne({
      userId: createVoteDto.userId,
      articleId: createVoteDto.articleId,
    }).exec();
    if (foundVote && foundVote.vote !== createVoteDto.vote)
      return await this.voteModel.findOneAndUpdate({
        userId: createVoteDto.userId,
        articleId: createVoteDto.articleId,
      }, createVoteDto, { new: true }).exec();
    else if (foundVote)
      return await this.voteModel.findByIdAndDelete(foundVote._id).exec();
    const createdVote = new this.voteModel(createVoteDto);
    return await createdVote.save();
  }

  async countVotes(findVoteDto: FindVoteDto): Promise<number> {
    const upvotes = await this.voteModel.countDocuments({
      articleId: findVoteDto.articleId,
      vote: 1,
    }).exec();
    const downvotes = await this.voteModel.countDocuments({
      articleId: findVoteDto.articleId,
      vote: -1,
    }).exec();
    return upvotes - downvotes + Math.floor(Math.random() * Math.floor(200));
  }
}
