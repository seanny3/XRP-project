import { Injectable } from '@nestjs/common';
import { PrismaService } from '@persistence/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePolicyDto } from '@module/admin/application/dtos/create-policy.dto';
import { UpdatePolicyDto } from '@module/admin/application/dtos/update-policy.dto';

@Injectable()
export class PolicyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: CreatePolicyDto, tx?: Prisma.TransactionClient) {
    return (tx || this.prisma).policy.create({
      data,
    });
  }

  async update(
    policyId: string,
    data: UpdatePolicyDto,
    tx?: Prisma.TransactionClient,
  ) {
    return (tx || this.prisma).policy.update({
      where: { id: policyId },
      data,
    });
  }

  async delete(policyId: string, tx?: Prisma.TransactionClient) {
    return (tx || this.prisma).policy.delete({ where: { id: policyId } });
  }

  async findById(policyId: string) {
    return this.prisma.policy.findUnique({
      where: {
        id: policyId,
      },
    });
  }

  async findByType(type: string) {
    return this.prisma.policy.findUnique({
      where: {
        type,
      },
    });
  }
}
