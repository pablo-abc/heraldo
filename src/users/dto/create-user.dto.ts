import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsEmail()
    readonly email: string;
}
