import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PolicyFeature } from '@module/admin/application/features/policy.feature';
import { CreatePolicyRequestBodyDto } from '@module/admin/interface/dtos/request/create-policy.body.dto';
import { UpdatePolicyRequestBodyDto } from '@module/admin/interface/dtos/request/update-policy.body.dto';
import { PolicyParamDto } from '@module/admin/interface/dtos/request/policy.param.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiPolicy } from '@admin/interface/controllers/swagger/policy.swagger';
import { Admin } from '@shared/security/roles/admin.role.decorator';

@ApiTags('Admin')
@Controller('policies')
// @Admin()
export class PolicyController {
  constructor(private readonly policyFeature: PolicyFeature) {}

  @ApiPolicy.CreatePolicy({ summary: '약관 생성 ✅' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async createPolicy(@Body() body: CreatePolicyRequestBodyDto): Promise<void> {
    await this.policyFeature.createPolicy(body);
  }

  @ApiPolicy.UpdatePolicy({ summary: '약관 수정 ✅' })
  @Patch(':policyId')
  @HttpCode(HttpStatus.OK)
  async updatePolicy(
    @Param() { policyId }: PolicyParamDto,
    @Body() body: UpdatePolicyRequestBodyDto,
  ) {
    await this.policyFeature.updatePolicy(policyId, body);
  }

  @ApiPolicy.DeletePolicy({ summary: '약관 삭제 ✅' })
  @Delete(':policyId')
  @HttpCode(HttpStatus.OK)
  async deletePolicy(@Param() { policyId }: PolicyParamDto) {
    await this.policyFeature.deletePolicy(policyId);
  }
}
