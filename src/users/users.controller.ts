import { Controller, Post, UsePipes, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { HashPasswordPipe } from '../pipes/hash-password.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @UsePipes(new HashPasswordPipe())
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }
}
