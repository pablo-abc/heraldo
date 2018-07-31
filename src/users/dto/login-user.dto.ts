import { IsString, IsEmail, ValidateIf, Validator, IsOptional } from 'class-validator';
const validator = new Validator();

export class LoginUserDto {
  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsString()
  readonly password: string;

  @ValidateIf(o => validator.isEmpty(o.username))
  @IsEmail()
  readonly email?: string;
}
