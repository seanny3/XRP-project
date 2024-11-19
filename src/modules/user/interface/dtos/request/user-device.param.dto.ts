import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDeviceParamDto {
  @ApiProperty({
    type: String,
    description: '디바이스 ID',
  })
  @IsNotEmpty()
  @IsString()
  deviceId: string;
}
