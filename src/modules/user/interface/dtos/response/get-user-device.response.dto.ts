import { GetUserDeviceDto } from '@user/application/dtos/get-user-device.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { DeviceType } from '@prisma/client';

@Exclude()
export class GetUserDeviceResponseDto implements GetUserDeviceDto {
  @ApiProperty({
    type: String,
    description: '디바이스 ID',
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    description: '유저 ID',
  })
  @Expose()
  userId: string;

  @ApiProperty({
    enum: DeviceType,
    description: '디바이스 종류',
  })
  @Expose()
  type: DeviceType;

  @ApiProperty({
    type: String,
    description: '브라우저 이름',
  })
  @Expose()
  browserName: string;

  @ApiProperty({
    type: String,
    description: '디바이스 버전',
  })
  @Expose()
  browserVersion: string;

  @ApiProperty({
    type: String,
    description: '운영체제 이름',
  })
  @Expose()
  osName: string;

  @ApiProperty({
    type: String,
    description: '운영체제 버전',
  })
  @Expose()
  osVersion: string;

  @ApiProperty({
    type: String,
    description: '플랫폼 정보',
  })
  @Expose()
  platform: string;

  @ApiProperty({
    type: String,
    description: '접속 당시 IP',
  })
  @Expose()
  ip: string;

  @ApiProperty({
    type: String,
    description: '접속 당시 지역',
  })
  @Expose()
  region: string;

  @ApiProperty({
    type: String,
    description: '최근 이 장치로 로그인했던 시간',
  })
  @Expose()
  lastLoginAt: Date;
}
