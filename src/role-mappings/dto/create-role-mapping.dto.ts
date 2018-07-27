import { IsMongoId, IsEmpty } from 'class-validator';

export class CreateRoleMappingDto {
    @IsMongoId()
    readonly userId: string;

    @IsMongoId()
    readonly roleId: string;

    @IsEmpty()
    readonly created: Date;

    @IsEmpty()
    readonly modified: Date;

    constructor(userId: string, roleId: string) {
        this.userId = userId;
        this.roleId = roleId;
    }
}
