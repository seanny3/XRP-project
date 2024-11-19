import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserParamDto {
  @ApiProperty({
    type: String,
    description: '유저ID',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
