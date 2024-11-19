import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UserDeviceFeature } from '@user/application/features/user-device.feature';
import { AuthTokenPayloadDto } from '@user/interface/dtos/common/auth-token-payload.dto';
import { User } from '@shared/decorators/user.request.decorator';
import { UserDeviceParamDto } from '@user/interface/dtos/request/user-device.param.dto';
import { ApiTags } from '@nestjs/swagger';
import { Member } from '@shared/security/roles/member.role.decorator';
import { ApiMyDevice } from '@user/interface/controllers/swagger/my-device.swagger';
import { GetUserDeviceResponseDto } from '@user/interface/dtos/response/get-user-device.response.dto';

@ApiTags('User')
@Controller('me/devices')
@Member()
export class MyDeviceController {
  constructor(private readonly userDeviceFeature: UserDeviceFeature) {}

  @ApiMyDevice.GetMyDevices({ summary: '내 모든 디바이스 조회 ✅' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getMyDevices(
    @User() payload: AuthTokenPayloadDto,
  ): Promise<GetUserDeviceResponseDto[]> {
    return this.userDeviceFeature.getUserDevices(payload.userId);
  }

  @ApiMyDevice.UnlinkMyDevice({ summary: '해당 디바이스 연결 해제 ✅' })
  @Delete(':deviceId')
  @HttpCode(HttpStatus.OK)
  async unlinkMyDevice(
    @Param() { deviceId }: UserDeviceParamDto,
  ): Promise<void> {
    await this.userDeviceFeature.unlinkUserDevice(deviceId);
  }
}
