import { IsString, IsEmail, IsEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsEmail()
    readonly email: string;

    @IsEmpty()
    readonly created: Date;

    @IsEmpty()
    readonly modified: Date;

    constructor(username: string, password: string, email: string) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
