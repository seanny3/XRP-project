import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { USER_CONSTRAINTS } from '@user/interface/constants/user.constant';

export class CheckDuplicateHandleRequestBodyDto {
  @ApiProperty({
    type: String,
    description: '사용자 핸들',
  })
  @IsNotEmpty()
  @IsString()
  @Length(
    USER_CONSTRAINTS.CUSTOM_HANDLE_MIN_LENGTH,
    USER_CONSTRAINTS.CUSTOM_HANDLE_MAX_LENGTH,
  )
  handle: string;
}
