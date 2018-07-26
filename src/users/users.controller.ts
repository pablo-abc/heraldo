import { Controller, Post, UsePipes, Body, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { HashPasswordPipe } from '../pipes/hash-password.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { RoleMappingsService } from '../role-mappings/role-mappings.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly roleMappingsService: RoleMappingsService,
    ) { }

    @Post()
    @UsePipes(new HashPasswordPipe())
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() createUserDto: CreateUserDto): Promise<string> {
        return this.usersService.login(createUserDto);
    }
}
