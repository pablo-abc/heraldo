import { IsBoolean, IsString, IsMongoId, IsOptional, IsNumber } from 'class-validator';

export class PatchArticleDto {
  @IsOptional()
  @IsMongoId()
  readonly _id?: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly image?: string;

  @IsOptional()
  @IsNumber()
  readonly votes?: number;

  @IsOptional()
  @IsBoolean()
  readonly approved?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly published?: boolean;

  @IsOptional()
  @IsString()
  readonly text?: string;

  @IsOptional()
  @IsMongoId()
  readonly userId?: string;
}
