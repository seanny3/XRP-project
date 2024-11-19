import { ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from '@user/application/dtos/get-user.dto';
import { Exclude, Expose, Transform } from 'class-transformer';
import { transformImageURL } from '@util/index';
import { GetUserLocationResponseDto } from '@user/interface/dtos/response/get-user-location.response.dto';
import { GetUserSocialResponseDto } from '@user/interface/dtos/response/get-user-social.response.dto';
import { UserAccessLevel, UserRole } from '@prisma/client';

@Exclude()
export class GetUserProfileResponseDto implements GetUserDto {
  @ApiProperty({
    type: String,
    description: '유저 ID',
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    description: '핸들',
  })
  @Expose()
  handle: string;

  @ApiProperty({
    type: String,
    description: '이름',
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    description: '프로필 이미지',
  })
  @Expose()
  @Transform(({ value }) => transformImageURL(value), {
    toPlainOnly: true,
  })
  avatar: string;

  // !!! MVP 2에서는 유저 프로필 정보가 제한적임. (핸들, 이름, 프로필이미지만 제공)
  bio: string;
  organization: string;
  jobTitle: string;
  socials: GetUserSocialResponseDto[];
  tags: string[];
  location: GetUserLocationResponseDto;
  accessLevel: UserAccessLevel;
  role: UserRole;
}
