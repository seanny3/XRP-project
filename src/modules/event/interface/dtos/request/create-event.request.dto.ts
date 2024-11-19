import { IsNotEmpty, IsTimeZone } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventRequestDto {
  @ApiProperty({
    type: String,
    description: 'Timezone',
  })
  @IsNotEmpty()
  @IsTimeZone()
  timezone: string;
}
