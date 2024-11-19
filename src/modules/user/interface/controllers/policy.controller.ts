import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetPolicyDto } from '@user/application/dtos/get-policy.dto';
import { PolicyFeature } from '@user/application/features/policy.feature';
import { ApiPolicy } from '@user/interface/controllers/swagger/policy.swagger';

@ApiTags('User')
@Controller('policies')
export class PolicyController {
  constructor(private readonly policyFeature: PolicyFeature) {}

  @ApiPolicy.GetPolicies({ summary: '모든 약관 조회 ✅' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async GetPolicies(): Promise<GetPolicyDto[]> {
    return await this.policyFeature.GetPolicies();
  }

  // TODO: 내가 동의한 약관 조회 API 추가
}
