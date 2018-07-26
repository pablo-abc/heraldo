import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { RoleMapping } from '../role-mappings/interfaces/role-mapping.interface';
import { Role } from '../roles/interfaces/role.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateRoleMappingDto } from '../role-mappings/dto/create-role-mapping.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('RoleMapping') private readonly roleMappingModel: Model<RoleMapping>,
        @InjectModel('Role') private readonly roleModel: Model<Role>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        const role = await this.roleModel.findOne({ name: createUserDto.role || 'user' });
        if (!role) throw new NotFoundException('Role does not exist');
        const user = await createdUser.save();
        const createRoleMappingDto = new CreateRoleMappingDto(user._id, role._id);
        const createdRoleMapping = new this.roleMappingModel(createRoleMappingDto);
        const roleMapping = await createdRoleMapping.save();
        const { password, ...rest } = user.toJSON();
        return rest;
    }

    async login(loginUserDto: LoginUserDto, roles?: string[]): Promise<string> {
        const user: User = await this.userModel.findOne({
            $or: [
                { username: loginUserDto.username },
                { email: loginUserDto.email },
            ],
        }).exec();
        if (!user) throw new BadRequestException();
        if (!await bcrypt.compare(loginUserDto.password, user.password))
            throw new BadRequestException();
        return jwt.sign({
            _id: user._id,
        }, process.env.SECRET, { expiresIn: '1w' });
    }
}
