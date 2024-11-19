import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserTpaParamDto {
  @ApiProperty({
    type: String,
    description: 'Third-party 엔티티 ID',
  })
  @IsNotEmpty()
  @IsString()
  tpaId: string;
}
