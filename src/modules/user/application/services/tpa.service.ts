import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateTpaDto } from '@user/application/dtos/create-tpa.dto';
import { Prisma } from '@prisma/client';
import { GetTpaDto } from '@user/application/dtos/get-tpa.dto';
import { TpaRepository } from '@user/domain/repositories/tpa.repository';
import { NotFoundException } from '@exception/custom/not-found.exception';
import { UserExceptionEnum } from '@exception/enum/user.enum';

@Injectable()
export class TpaService {
  constructor(private readonly tpaRepository: TpaRepository) {}

  async getTpaList(userId: string): Promise<GetTpaDto[]> {
    const tpas = await this.tpaRepository.findByUserId(userId);
    return plainToInstance(GetTpaDto, tpas);
  }

  // Third-Party 계정으로 처음 로그인한 경우, Third-Party 계정을 자동 연동(생성)한다.
  async createTpa(
    userId: string,
    createTpaDto: CreateTpaDto,
    tx?: Prisma.TransactionClient,
  ): Promise<GetTpaDto> {
    const foundTpa = await this.tpaRepository.findByUserIdAndProvider(
      userId,
      createTpaDto.provider,
    );

    // Third-party 계정이 이미 존재하면 무시
    if (foundTpa) {
      return;
    }

    // Third-party 계정이 존재하지 않으면 자동 연동 (새로 생성)
    const createdTpa = await this.tpaRepository.save(userId, createTpaDto, tx);
    return plainToInstance(GetTpaDto, createdTpa);
  }

  async deleteTpa(id: string, tx?: Prisma.TransactionClient): Promise<void> {
    const foundTpa = await this.tpaRepository.findById(id);
    if (!foundTpa) {
      throw new NotFoundException(UserExceptionEnum.ThirdPartyAccountNotFound);
    }
    await this.tpaRepository.delete(id, tx);
  }
}
