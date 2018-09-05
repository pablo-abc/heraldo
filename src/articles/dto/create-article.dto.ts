import { IsString, IsMongoId, IsOptional, IsBoolean } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly text: string;

  @IsString()
  readonly image: string;

  @IsMongoId()
  readonly userId: string;

  @IsOptional()
  @IsBoolean()
  readonly published?: boolean;
}
