import { Injectable } from '@nestjs/common';
import { PolicyRepository } from '@user/domain/repositories/policy.repository';
import { PolicyExceptionEnum } from '@exception/enum/policy.enum';
import { BadRequestException } from '@exception/custom/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { GetPolicyDto } from '@user/application/dtos/get-policy.dto';

@Injectable()
export class PolicyService {
  constructor(private readonly policyRepository: PolicyRepository) {}

  async GetPolicies(): Promise<GetPolicyDto[]> {
    const foundPolicies = await this.policyRepository.findMany();
    return plainToInstance(GetPolicyDto, foundPolicies);
  }

  async isAgreedRequiredPolicies(agreedPolicies: string[]): Promise<void> {
    const foundPolicies = await this.policyRepository.findManyByRequired();
    for (const requiredPolicy of foundPolicies) {
      if (!agreedPolicies.includes(requiredPolicy.type)) {
        throw new BadRequestException(
          PolicyExceptionEnum.NotAgreedRequiredPolicy,
        );
      }
    }
  }
}
