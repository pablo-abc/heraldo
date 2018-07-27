import { IsString, IsMongoId, IsOptional } from 'class-validator';

export class FindCommentsDto {
  @IsOptional()
  @IsMongoId()
  readonly articleId?: string;

  @IsOptional()
  @IsMongoId()
  readonly userId?: string;
}
