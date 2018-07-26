import { Controller, Post, UsePipes, Body, HttpCode, Req, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { HashPasswordPipe } from '../pipes/hash-password.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { RoleMappingsService } from '../role-mappings/role-mappings.service';
import { AuthService } from 'auth/auth.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly roleMappingsService: RoleMappingsService,
        private readonly authService: AuthService,
    ) { }

    @Post()
    @UsePipes(new HashPasswordPipe())
    create(@Body() createUserDto: CreateUserDto, @Req() req): Promise<User> {
        if (!this.authService.validateCreateUser(req, createUserDto))
            throw new ForbiddenException('You can not assign a role to a user');
        else
            return this.usersService.create(createUserDto);
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() createUserDto: CreateUserDto): Promise<string> {
        return this.usersService.login(createUserDto);
    }
}
