import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { USER_CONSTRAINTS } from '@user/interface/constants/user.constant';
import { Transform } from 'class-transformer';
import { CreateUserDto } from '@user/application/dtos/create-user.dto';

export class RegisterRequestBodyDto implements Omit<CreateUserDto, 'handle'> {
  @ApiProperty({
    type: String,
    description: '이름',
  })
  @IsNotEmpty()
  @IsString()
  @Length(USER_CONSTRAINTS.NAME_MIN_LENGTH, USER_CONSTRAINTS.NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({
    type: String,
    description: '프로필 이미지',
  })
  @IsOptional()
  @IsString()
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
    type: [String],
    description: '동의한 약관 type',
    example: ['PRIVACY_POLICY', 'TERMS_OF_SERVICE'],
  })
  @IsNotEmpty({ each: true })
  @IsArray()
  @IsString({ each: true })
  agreedPolicies: string[];
}
