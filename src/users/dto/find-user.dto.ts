import { IsString, IsEmail, IsOptional, IsMongoId } from 'class-validator';

export class FindUserDto {
  @IsOptional()
  @IsMongoId()
  readonly _id?: string;

  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;
}
