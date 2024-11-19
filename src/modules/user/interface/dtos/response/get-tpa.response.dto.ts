import { Exclude, Expose } from 'class-transformer';
import { ThirdPartyProvider } from '@prisma/client';
import { GetTpaDto } from '@user/application/dtos/get-tpa.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class GetTpaResponseDto implements GetTpaDto {
  @ApiProperty({
    type: String,
    description: 'Third-Party 계정 ID',
  })
  @Expose()
  id: string;

  @ApiProperty({
    enum: ThirdPartyProvider,
    description: '제공업체 종류',
  })
  @Expose()
  provider: ThirdPartyProvider;

  @ApiProperty({
    type: Date,
    description: 'Third-Party 서비스 연동 일시',
  })
  @Expose()
  linkedAt: Date;

  accessToken: string;
  providerId: string;
  refreshToken: string;
  userId: string;
}
