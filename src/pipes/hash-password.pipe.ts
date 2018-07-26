import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class HashPasswordPipe implements PipeTransform<CreateUserDto, Promise<User>> {
    async transform(user: User, metadata: ArgumentMetadata): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        return new CreateUserDto(
            user.username,
            hashedPassword,
            user.email,
        );
    }
}
