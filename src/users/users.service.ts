import { Injectable, BadRequestException, ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { RoleMapping } from '../role-mappings/interfaces/role-mapping.interface';
import { Role } from '../roles/interfaces/role.interface';
import { AccessToken } from '../auth/interfaces/user-access-token.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateRoleMappingDto } from '../role-mappings/dto/create-role-mapping.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as uuidv4 from 'uuid/v4';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('RoleMapping') private readonly roleMappingModel: Model<RoleMapping>,
        @InjectModel('Role') private readonly roleModel: Model<Role>,
        @InjectModel('AccessToken') private readonly accessTokenModel: Model<AccessToken>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const foundUser = await this.userModel.findOne({
            $or: [
                { username: createUserDto.username },
                { email: createUserDto.email },
            ],
        });
        if (foundUser) throw new ConflictException('Email or username already in use');
        const createdUser = new this.userModel(createUserDto);
        const role = await this.roleModel.findOne({ name: createUserDto.role || 'user' });
        const userRole = role.name !== 'user' ? await this.roleModel.findOne({ name: 'user' }) : role;
        if (!role || !userRole) throw new NotFoundException('Role does not exist');
        const user = await createdUser.save();
        const createRoleMappingDto = new CreateRoleMappingDto(user._id, role._id);
        const createdRoleMapping = new this.roleMappingModel(createRoleMappingDto);
        const roleMapping = await createdRoleMapping.save();
        const { password, ...rest } = user.toJSON();
        if (role.name === 'user')
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
        const userRoles = await this.roleMappingModel.find({ userId: user._id }).populate('roleId', '-_id name').exec();
        const parsedRoles = userRoles.map(role => {
            return role.roleId.name;
        });
        const createdAccessToken = new this.accessTokenModel({
            userId: user._id,
            jwtid: uuidv4(),
        });
        const accessToken = await createdAccessToken.save();
        return jwt.sign({
            _id: user._id,
            jwtid: accessToken.jwtid,
            roles: parsedRoles,
        }, process.env.SECRET, { expiresIn: '1h' });
    }
}
