import { Controller, Post, Get, Delete, Body, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './interfaces/role.interface';
import { RolesService } from './roles.service';
import { Roles } from 'decorators/roles.decorator';
import { RolesGuard } from 'guards/roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }
}
