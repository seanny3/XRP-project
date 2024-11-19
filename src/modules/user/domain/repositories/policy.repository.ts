import { Injectable } from '@nestjs/common';
import { PrismaService } from '@persistence/prisma/prisma.service';

@Injectable()
export class PolicyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    return this.prisma.policy.findMany();
  }

  async findByType(type: string) {
    return this.prisma.policy.findUnique({
      where: { type },
    });
  }

  async findManyByRequired() {
    return this.prisma.policy.findMany({
      where: { required: true },
    });
  }
}
