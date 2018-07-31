import { IsNumber, IsMongoId, IsIn, IsOptional } from 'class-validator';

export class CreateVoteDto {
  @IsOptional()
  @IsMongoId()
  readonly articleId?: string;

  @IsOptional()
  @IsMongoId()
  readonly userId?: string;

  @IsNumber()
  @IsIn([-1, 1])
  readonly vote: number;

  constructor(userId: string, articleId: string, vote: number) {
    this.articleId = articleId;
    this.userId = userId;
    this.vote = vote;
  }
}
