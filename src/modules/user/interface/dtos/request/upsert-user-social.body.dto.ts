import { ApiProperty } from '@nestjs/swagger';
import { SocialType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { UpsertUserSocialDto } from '@user/application/dtos/upsert-user-social.dto';

export class UpsertUserSocialBodyDto
  implements Omit<UpsertUserSocialDto, 'position'>
{
  @ApiProperty({
    enum: SocialType,
    description: '소셜 타입',
  })
  @IsNotEmpty()
  @IsEnum(SocialType)
  type: SocialType;

  @ApiProperty({
    type: String,
    description: 'URL',
  })
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
