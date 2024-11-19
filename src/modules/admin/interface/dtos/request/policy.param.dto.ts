import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PolicyParamDto {
  @ApiProperty({
    type: String,
    description: '약관 ID',
  })
  @IsNotEmpty()
  policyId: string;
}
