import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { USER_CONSTRAINTS } from '@user/interface/constants/user.constant';
import { Transform, Type } from 'class-transformer';
import { UpsertUserLocationRequestBodyDto } from '@user/interface/dtos/request/upsert-user-location.body.dto';
import { UpsertUserSocialBodyDto } from '@user/interface/dtos/request/upsert-user-social.body.dto';

export class UpdateProfileRequestBodyDto {
  @ApiProperty({
    type: String,
    description: '이름',
  })
  @IsOptional()
  @IsString()
  @Length(USER_CONSTRAINTS.NAME_MIN_LENGTH, USER_CONSTRAINTS.NAME_MAX_LENGTH)
  @Transform(({ value }) => (value === '' ? null : value))
  name: string;

  @ApiProperty({
    type: String,
    description: '프로필 이미지: s3 key',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? null : value))
  avatar: string;

  @ApiProperty({
    type: String,
    description: '소개',
  })
  @IsOptional()
  @IsString()
  @Length(USER_CONSTRAINTS.BIO_MIN_LENGTH, USER_CONSTRAINTS.BIO_MAX_LENGTH)
  @Transform(({ value }) => (value === '' ? null : value))
  bio: string;

  @ApiProperty({
    type: String,
    description: '소속',
  })
  @IsOptional()
  @IsString()
  @Length(
    USER_CONSTRAINTS.ORGANIZATION_MIN_LENGTH,
    USER_CONSTRAINTS.ORGANIZATION_MAX_LENGTH,
  )
  @Transform(({ value }) => (value === '' ? null : value))
  organization: string;

  @ApiProperty({
    type: String,
    description: '직함',
  })
  @IsOptional()
  @IsString()
  @Length(
    USER_CONSTRAINTS.JOB_TITLE_MIN_LENGTH,
    USER_CONSTRAINTS.JOB_TITLE_MAX_LENGTH,
  )
  @Transform(({ value }) => (value === '' ? null : value))
  jobTitle: string;

  @ApiProperty({
    type: [UpsertUserSocialBodyDto],
    description: '소셜',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpsertUserSocialBodyDto)
  socials: UpsertUserSocialBodyDto[];

  @ApiProperty({
    type: [String],
    description: '태그',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  @ArrayMaxSize(USER_CONSTRAINTS.TAG_MAX_COUNT)
  @IsNotEmpty({ each: true })
  @Length(USER_CONSTRAINTS.TAG_MIN_LENGTH, USER_CONSTRAINTS.TAG_MAX_LENGTH, {
    each: true,
  })
  tags: string[];

  @ApiProperty({
    type: UpsertUserLocationRequestBodyDto,
    description: '위치 정보 객체',
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpsertUserLocationRequestBodyDto)
  location: UpsertUserLocationRequestBodyDto;
}
