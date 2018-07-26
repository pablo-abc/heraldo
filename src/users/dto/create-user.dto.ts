import { IsString, IsEmail, IsEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsEmail()
    readonly email: string;

    @IsOptional()
    @IsString()
    readonly role?: string;

    @IsEmpty()
    readonly created: Date;

    @IsEmpty()
    readonly modified: Date;

    constructor(username: string, password: string, email: string, role?: string) {
        this.username = username;
        this.password = password;
        this.email = email;
        if (role) this.role = role;
    }
}
