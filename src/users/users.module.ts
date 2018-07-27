import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { RolesModule } from '../roles/roles.module';
import { RoleMappingsModule } from '../role-mappings/role-mappings.module';
import { RoleMappingSchema } from 'role-mappings/schemas/role-mapping.schema';
import { RoleSchema } from 'roles/schemas/role.schema';
import { AccessTokenSchema } from '../auth/schemas/user-access-token.schema';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
    RolesModule,
    RoleMappingsModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
