import { IsString, IsOptional, IsNumber, IsMongoId, IsBoolean } from 'class-validator';

export class FindArticleDto {
  @IsOptional()
  @IsMongoId()
  readonly _id?: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsBoolean()
  readonly approved?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly published?: boolean;

  @IsOptional()
  @IsNumber()
  readonly limit?: number;

  @IsOptional()
  @IsNumber()
  readonly skip?: number;
}
