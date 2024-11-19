import { Module } from '@nestjs/common';
import { PolicyController } from '@admin/interface/controllers/policy.controller';
import { PolicyFeature } from '@admin/application/features/policy.feature';
import { PolicyService } from '@admin/application/services/policy.service';
import { PolicyRepository } from '@admin/domain/repositories/policy.repository';

@Module({
  controllers: [PolicyController],
  providers: [PolicyFeature, PolicyService, PolicyRepository],
  exports: [],
})
export class AdminModule {}
