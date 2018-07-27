import { IsString, IsEmpty, IsMongoId } from 'class-validator';

export class CreateCommentDto {
  @IsMongoId()
  readonly articleId: string;

  @IsString()
  readonly text: string;

  @IsMongoId()
  readonly userId: string;

  @IsEmpty()
  readonly created: string;

  @IsEmpty()
  readonly modified: string;

  constructor(articleId: string, text: string, userId: string) {
    this.articleId = articleId;
    this.text = text;
    this.userId = userId;
  }
}
