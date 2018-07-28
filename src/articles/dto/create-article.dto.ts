import { IsString, IsMongoId, IsOptional, IsArray } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly text: string;

  @IsMongoId()
  readonly userId: string;

  @IsOptional()
  @IsArray()
  @IsString()
  readonly comments: string[];
}
