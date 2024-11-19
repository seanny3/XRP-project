import { Exclude, Expose } from 'class-transformer';
import { GetUserSocialDto } from '@user/application/dtos/get-user-social.dto';
import { SocialType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class GetUserSocialResponseDto implements GetUserSocialDto {
  @ApiProperty({
    enum: SocialType,
    description: '소셜 타입',
  })
  @Expose()
  type: SocialType;

  @ApiProperty({
    type: String,
    description: '소셜 핸들',
  })
  @Expose()
  url: string;

  id: string;
}
