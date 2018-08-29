import { Controller, Get, Post, UsePipes, Query, Body, Param, HttpCode, Req, ForbiddenException, ValidationPipe, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { HashPasswordPipe } from '../pipes/hash-password.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { RoleMappingsService } from '../role-mappings/role-mappings.service';
import { RoleMapping } from '../role-mappings/interfaces/role-mapping.interface';
import { AuthService } from '../auth/auth.service';
import { Validator } from 'class-validator';
import { ResponseToken } from '../auth/interfaces/response-token.interface';
import { CreateRoleMappingDto } from '../role-mappings/dto/create-role-mapping.dto';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { FindUserDto } from './dto/find-user.dto';
const validator = new Validator();

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly roleMappingsService: RoleMappingsService,
    private readonly authService: AuthService,
  ) { }

  @Get('exists')
  exists(@Query() findUserDto: FindUserDto): Promise<boolean> {
    return this.usersService.find(findUserDto)
      .then(users => {
        return users.length > 0;
      });
  }

  @Post()
  @UsePipes(new HashPasswordPipe(), new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateUserDto, @Req() req): Promise<User> {
    if (!this.authService.validateCreateUser(req, createUserDto))
      throw new ForbiddenException('You can not assign a role to a user');
    else
      return this.usersService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() createUserDto: CreateUserDto): Promise<ResponseToken> {
    return this.usersService.login(createUserDto);
  }

  @Post(':userId/roles/:roleId')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  assignRole(@Param() createRoleMappingDto: CreateRoleMappingDto): Promise<RoleMapping> {
    return this.roleMappingsService.create(createRoleMappingDto);
  }
}
