import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteSchema } from './schemas/vote.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Vote', schema: VoteSchema },
  ])],
  providers: [VotesService],
  exports: [VotesService],
})
export class VotesModule { }
