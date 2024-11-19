import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { GetUserDto } from '@user/application/dtos/get-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { transformImageURL } from '@util/index';
import { UserAccessLevel, UserRole } from '@prisma/client';
import { GetUserLocationResponseDto } from '@user/interface/dtos/response/get-user-location.response.dto';
import { GetUserSocialResponseDto } from '@user/interface/dtos/response/get-user-social.response.dto';

@Exclude()
export class GetMyProfileResponseDto implements GetUserDto {
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

  @ApiProperty({
    type: String,
    description: '자기소개',
  })
  @Expose()
  bio: string;

  @ApiProperty({
    type: String,
    description: '소속',
  })
  @Expose()
  organization: string;

  @ApiProperty({
    type: String,
    description: '직함',
  })
  @Expose()
  jobTitle: string;

  @ApiProperty({
    type: [GetUserSocialResponseDto],
    description: '소셜링크 목록',
  })
  @Expose()
  @Type(() => GetUserSocialResponseDto)
  socials: GetUserSocialResponseDto[];

  @ApiProperty({
    enum: UserAccessLevel,
    description: '서비스 접근 레벨 (회원이 접근할 수 있는 서비스 범위)',
  })
  @Expose()
  accessLevel: UserAccessLevel;

  @ApiProperty({
    enum: UserRole,
    description: '서비스 역할 구분 (관리자, 사용자)',
  })
  @Expose()
  role: UserRole;

  @ApiProperty({
    type: [String],
    description: '태그 리스트',
  })
  @Expose()
  tags: string[];

  @ApiProperty({
    type: GetUserLocationResponseDto,
    description: '위치',
  })
  @Expose()
  @Type(() => GetUserLocationResponseDto)
  location: GetUserLocationResponseDto;
}
