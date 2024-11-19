import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CheckDuplicateEmailRequestBodyDto {
  @ApiProperty({
    type: String,
    description: '사용자 이메일',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
