import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): Promise<boolean> | boolean {
        return true;
    }
}
