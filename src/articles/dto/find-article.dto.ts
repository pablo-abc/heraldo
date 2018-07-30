import { IsString, IsOptional, IsNumber } from 'class-validator';

export class FindArticleDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsNumber()
  readonly limit?: number;
}
