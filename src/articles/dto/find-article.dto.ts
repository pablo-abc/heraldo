import { IsString, IsOptional, IsNumber, IsMongoId } from 'class-validator';

export class FindArticleDto {
  @IsOptional()
  @IsMongoId()
  readonly _id?: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsNumber()
  readonly limit?: number;
}
