import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async login(loginUserDto: LoginUserDto): Promise<string> {
        const user: User = await this.userModel.findOne({
            $or: [
                { username: loginUserDto.username },
                { email: loginUserDto.email },
            ],
        }).exec();
        if (!user) throw new BadRequestException();
        if (loginUserDto.password !== user.password)
            throw new BadRequestException();
        return jwt.sign({
            _id: user._id,
        }, process.env.SECRET);
    }
}
