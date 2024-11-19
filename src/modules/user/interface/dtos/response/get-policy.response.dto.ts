import { GetPolicyDto } from '@user/application/dtos/get-policy.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetPolicyResponseDto implements GetPolicyDto {
  @ApiProperty({
    type: String,
    description: '약관 ID',
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    description: '약관 제목',
  })
  @Expose()
  title: string;

  @ApiProperty({
    type: String,
    description: '약관 설명',
  })
  @Expose()
  description: string;

  @ApiProperty({
    type: String,
    description: '약관 URL',
  })
  @Expose()
  url: string;

  @ApiProperty({
    type: String,
    description: '약관 필수여부',
  })
  @Expose()
  required: boolean;

  @ApiProperty({
    type: String,
    description: '약관 종류',
  })
  @Expose()
  type: string;
}
