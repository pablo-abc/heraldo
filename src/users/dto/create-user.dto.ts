import { IsString, IsEmail, IsEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsArray()
  readonly roles?: string[];

  @IsEmpty()
  readonly created: Date;

  @IsEmpty()
  readonly modified: Date;

  constructor(username: string, password: string, firstName: string, lastName: string, description: string, email: string, roles?: string[]) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.description = description;
    this.email = email;
    if (roles) this.roles = roles;
  }
}
