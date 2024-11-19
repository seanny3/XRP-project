import { Injectable } from '@nestjs/common';
import { PolicyRepository } from '@module/admin/domain/repositories/policy.repository';
import { CreatePolicyDto } from '@module/admin/application/dtos/create-policy.dto';
import { plainToInstance } from 'class-transformer';
import { UpdatePolicyRequestBodyDto } from '@module/admin/interface/dtos/request/update-policy.body.dto';
import { UpdatePolicyDto } from '@module/admin/application/dtos/update-policy.dto';
import { CreatePolicyRequestBodyDto } from '@admin/interface/dtos/request/create-policy.body.dto';
import { ConflictException } from '@exception/custom/conflict.exception';
import { PolicyExceptionEnum } from '@exception/enum/policy.enum';
import { NotFoundException } from '@exception/custom/not-found.exception';

@Injectable()
export class PolicyService {
  constructor(private readonly policyRepository: PolicyRepository) {}

  async createPolicy(
    createPolicyRequestDto: CreatePolicyRequestBodyDto,
  ): Promise<void> {
    const foundPolicy = await this.policyRepository.findByType(
      createPolicyRequestDto.type,
    );
    if (foundPolicy) {
      throw new ConflictException(PolicyExceptionEnum.PolicyAlreadyExist);
    }
    const createPolicyDto = plainToInstance(
      CreatePolicyDto,
      createPolicyRequestDto,
    );
    await this.policyRepository.save(createPolicyDto);
  }

  async updatePolicy(
    policyId: string,
    updatePolicyRequestBodyDto: UpdatePolicyRequestBodyDto,
  ) {
    const foundPolicy = await this.policyRepository.findById(policyId);
    if (!foundPolicy) {
      throw new NotFoundException(PolicyExceptionEnum.PolicyNotFound);
    }
    const updatePolicyDto = plainToInstance(
      UpdatePolicyDto,
      updatePolicyRequestBodyDto,
    );
    await this.policyRepository.update(policyId, updatePolicyDto);
  }

  async deletePolicy(policyId: string) {
    const foundPolicy = await this.policyRepository.findById(policyId);
    if (!foundPolicy) {
      throw new NotFoundException(PolicyExceptionEnum.PolicyNotFound);
    }
    await this.policyRepository.delete(policyId);
  }
}
