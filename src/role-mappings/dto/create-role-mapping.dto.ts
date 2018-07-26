import { IsMongoId } from 'class-validator';

export class CreateRoleMappingDto {
    @IsMongoId()
    readonly userId: string;

    @IsMongoId()
    readonly roleId: string;
}
