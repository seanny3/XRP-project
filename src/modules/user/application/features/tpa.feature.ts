import { Injectable } from '@nestjs/common';
import { TpaService } from '@user/application/services/tpa.service';
import { GetTpaDto } from '@user/application/dtos/get-tpa.dto';
import { plainToInstance } from 'class-transformer';
import { CreateTpaDto } from '@user/application/dtos/create-tpa.dto';
import { OpenAuthInfoDto } from '@user/interface/dtos/common/open-auth-info.dto';
import { UserService } from '@user/application/services/user.service';
import { GetTpaResponseDto } from '@user/interface/dtos/response/get-tpa.response.dto';

@Injectable()
export class TpaFeature {
  constructor(
    private readonly tpaService: TpaService,
    private readonly userService: UserService,
  ) {}

  async getTpaList(userId: string): Promise<GetTpaResponseDto[]> {
    const foundTpaList = await this.tpaService.getTpaList(userId);
    return plainToInstance(GetTpaResponseDto, foundTpaList);
  }

  async linkTpa(openAuthInfoDto: OpenAuthInfoDto): Promise<void> {
    const foundUser = await this.userService.getUserByEmail(
      openAuthInfoDto.email,
    );
    const createTpaDto = plainToInstance(CreateTpaDto, {
      provider: openAuthInfoDto.provider,
      providerId: openAuthInfoDto.provider,
      accessToken: openAuthInfoDto.accessToken,
      refreshToken: openAuthInfoDto.refreshToken,
    });
    await this.tpaService.createTpa(foundUser.id, createTpaDto);
  }

  async unlinkTpa(id: string): Promise<void> {
    await this.tpaService.deleteTpa(id);
  }
}
