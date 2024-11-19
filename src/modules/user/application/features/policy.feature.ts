import { Injectable } from '@nestjs/common';
import { PolicyService } from '@user/application/services/policy.service';
import { GetPolicyResponseDto } from '@user/interface/dtos/response/get-policy.response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PolicyFeature {
  constructor(private readonly policyService: PolicyService) {}

  async GetPolicies(): Promise<GetPolicyResponseDto[]> {
    const foundPolicies = await this.policyService.GetPolicies();
    return plainToInstance(GetPolicyResponseDto, foundPolicies);
  }
}
