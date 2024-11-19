import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreatePolicyRequestBodyDto {
  @ApiProperty({
    type: String,
    description: '약관 제목',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: '약관 제목',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    description: '약관 상세정보 URL',
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    type: Boolean,
    description: '약관 필수여부',
  })
  @IsNotEmpty()
  required: boolean;

  @ApiProperty({
    type: String,
    description: '약관 종류',
  })
  @IsNotEmpty()
  type: string;
}
