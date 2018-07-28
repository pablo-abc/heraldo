import { IsString, IsMongoId, IsOptional } from 'class-validator';

export class PatchArticleDto {
  @IsOptional()
  @IsMongoId()
  readonly _id?: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly text?: string;

  @IsOptional()
  @IsMongoId()
  readonly userId?: string;
}
