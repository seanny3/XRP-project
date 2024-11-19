import { Injectable } from '@nestjs/common';
import { PolicyService } from '@module/admin/application/services/policy.service';
import { UpdatePolicyRequestBodyDto } from '@module/admin/interface/dtos/request/update-policy.body.dto';
import { CreatePolicyRequestBodyDto } from '@admin/interface/dtos/request/create-policy.body.dto';

@Injectable()
export class PolicyFeature {
  constructor(private readonly policyService: PolicyService) {}

  async createPolicy(createPolicyRequestDto: CreatePolicyRequestBodyDto) {
    await this.policyService.createPolicy(createPolicyRequestDto);
  }

  async updatePolicy(
    policyId: string,
    updatePolicyRequestBodyDto: UpdatePolicyRequestBodyDto,
  ) {
    await this.policyService.updatePolicy(policyId, updatePolicyRequestBodyDto);
  }

  async deletePolicy(policyId: string) {
    await this.policyService.deletePolicy(policyId);
  }
}
