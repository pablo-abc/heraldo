import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { RolesModule } from '../roles/roles.module';
import { RoleMappingsModule } from '../role-mappings/role-mappings.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        RolesModule,
        RoleMappingsModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }
