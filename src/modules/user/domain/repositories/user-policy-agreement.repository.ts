import { Injectable } from '@nestjs/common';
import { PrismaService } from '@persistence/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserPolicyAgreementRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(
    userId: string,
    policyType: string,
    tx?: Prisma.TransactionClient,
  ) {
    return (tx || this.prisma).userPolicyAgreement.create({
      data: {
        user: { connect: { id: userId } },
        policy: { connect: { type: policyType } },
      },
    });
  }

  async findByUserIdAndPolicyId(userId: string, policyType: string) {
    return this.prisma.userPolicyAgreement.findUnique({
      where: {
        userId_policyType: {
          userId,
          policyType,
        },
      },
    });
  }

  async findManyByUserId(userId: string) {
    return this.prisma.userPolicyAgreement.findMany({
      where: {
        userId,
      },
    });
  }

  async delete(
    userId: string,
    policyType: string,
    tx?: Prisma.TransactionClient,
  ) {
    await (tx || this.prisma).userPolicyAgreement.delete({
      where: {
        userId_policyType: {
          userId,
          policyType,
        },
      },
    });
  }
}
