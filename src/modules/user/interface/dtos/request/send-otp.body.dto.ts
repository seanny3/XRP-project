import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OtpMethod } from '@user/interface/constants/otp.constant';

export class SendOtpRequestBodyDto {
  @ApiProperty({
    enum: OtpMethod,
    description: 'OTP 전송 방법',
  })
  @IsNotEmpty()
  @IsEnum(OtpMethod)
  method: OtpMethod;

  @ApiProperty({
    type: String,
    description: '연락수단 (이메일 or 전화번호)',
  })
  @IsNotEmpty()
  @IsString()
  to: string;
}
