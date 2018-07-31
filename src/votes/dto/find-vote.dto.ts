import { IsOptional, IsMongoId, IsNumber } from 'class-validator';

export class FindVoteDto {
  @IsOptional()
  @IsMongoId()
  readonly articleId?: string;

  @IsOptional()
  @IsMongoId()
  readonly userId?: string;

  @IsOptional()
  @IsNumber()
  readonly vote?: number;

  constructor(articleId?: string, userId?: string, vote?: number) {
    if (articleId) this.articleId = articleId;
    if (userId) this.userId = userId;
    if (vote) this.vote = vote;
  }
}
