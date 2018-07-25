import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class HashPasswordPipe implements PipeTransform<CreateUserDto, Promise<User>> {
    async transform(user: CreateUserDto, metadata: ArgumentMetadata): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 24);
        return user.storePassword(user, hashedPassword);
    }
}
