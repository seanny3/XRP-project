import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TpaFeature } from '@user/application/features/tpa.feature';
import { User } from '@shared/decorators/user.request.decorator';
import { AuthTokenPayloadDto } from '@user/interface/dtos/common/auth-token-payload.dto';
import { UserTpaParamDto } from '@user/interface/dtos/request/user-tpa.param.dto';
import { ApiTags } from '@nestjs/swagger';
import { Member } from '@shared/security/roles/member.role.decorator';
import { ApiMyTpa } from '@user/interface/controllers/swagger/my-tpa.swagger';
import { OpenAuthInfoDto } from '@user/interface/dtos/common/open-auth-info.dto';
import { OpenAuthGuard } from '@user/application/security/guards/open-auth.guard';
import { OpenAuthRequestBodyDto } from '@user/interface/dtos/request/open-auth.body.dto';
import { GetTpaResponseDto } from '@user/interface/dtos/response/get-tpa.response.dto';

@ApiTags('User')
@Controller('me/tpa')
@Member()
export class MyTpaController {
  constructor(private readonly tpaFeature: TpaFeature) {}

  @ApiMyTpa.GetTpaList({
    summary: '연동된 모든 써드파티 계정 조회 ✅',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getTpaList(
    @User() payload: AuthTokenPayloadDto,
  ): Promise<GetTpaResponseDto[]> {
    return this.tpaFeature.getTpaList(payload.userId);
  }

  @ApiMyTpa.LinkTpa({
    summary: '써드파티 계정 연동 ✅',
  })
  @Post()
  @Member()
  @UseGuards(OpenAuthGuard)
  @HttpCode(HttpStatus.OK)
  async linkTpa(
    @User() openAuthInfoDto: OpenAuthInfoDto,
    @Body() openAuthRequestBodyDto: OpenAuthRequestBodyDto,
  ): Promise<void> {
    await this.tpaFeature.linkTpa(openAuthInfoDto);
  }

  @ApiMyTpa.UnlinkTpa({
    summary: '해당 써드파티 계정 연동 해제 ✅',
  })
  @Delete(':tpaId')
  @HttpCode(HttpStatus.OK)
  async unlinkTpa(@Param() { tpaId }: UserTpaParamDto): Promise<void> {
    await this.tpaFeature.unlinkTpa(tpaId);
  }
}
