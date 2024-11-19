import { Injectable } from '@nestjs/common';
import { UserPolicyAgreementRepository } from '@user/domain/repositories/user-policy-agreement.repository';
import { Prisma } from '@prisma/client';
import { PolicyRepository } from '@user/domain/repositories/policy.repository';
import { NotFoundException } from '@exception/custom/not-found.exception';
import { PolicyExceptionEnum } from '@exception/enum/policy.enum';

@Injectable()
export class UserPolicyAgreementService {
  constructor(
    private readonly userPolicyAgreementRepository: UserPolicyAgreementRepository,
    private readonly policyRepository: PolicyRepository,
  ) {}

  async createUserPolicyAgreement(
    userId: string,
    policyType: string,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const foundPolicy = await this.policyRepository.findByType(policyType);
    if (!foundPolicy) {
      throw new NotFoundException(PolicyExceptionEnum.PolicyNotFound);
    }
    await this.userPolicyAgreementRepository.save(userId, policyType, tx);
  }
}
