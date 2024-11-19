import { Global, Module } from '@nestjs/common';
import { AccessGuard } from '@shared/security/guards/access.guard';
import { RolesGuard } from '@shared/security/guards/roles.guard';

@Global()
@Module({
  providers: [RolesGuard, AccessGuard],
  exports: [RolesGuard, AccessGuard],
})
export class SecurityModule {}
