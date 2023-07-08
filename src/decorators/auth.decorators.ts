import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ROLES_KEY, Role } from './roles.decorators';
import { AuthGuard } from '../infra/providers/auth-guard.provider';
import { RolesGuard } from '../infra/providers/roles-guard.provider';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}
