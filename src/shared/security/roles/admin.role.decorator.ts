import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { AccessGuard } from '@shared/security/guards/access.guard';
import { RolesGuard } from '@shared/security/guards/roles.guard';

export function Admin() {
  return applyDecorators(
    SetMetadata('roles', [UserRole.ADMIN]),
    UseGuards(AccessGuard, RolesGuard),
  );
}
