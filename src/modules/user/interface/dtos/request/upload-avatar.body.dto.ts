import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadAvatarBodyDto {
  @ApiProperty({
    name: 'image',
    type: 'string',
    format: 'binary',
    description: '유저 프로필 이미지',
  })
  @IsNotEmpty()
  @IsString()
  image: string;
}
