import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GetUserLocationDto } from '@user/application/dtos/get-user-location.dto';
import { LocationType } from '@prisma/client';

@Exclude()
export class GetUserLocationResponseDto implements GetUserLocationDto {
  @ApiProperty({
    enum: LocationType,
    description: '위치 저장 방식 (GOOGLE or MANUAL)',
  })
  @Expose()
  type: LocationType;

  @ApiProperty({
    type: String,
    description: '국가',
  })
  @Expose()
  country: string;

  @ApiProperty({
    type: String,
    description: '주(state), 도(ex.경기도), 대도시(ex.서울특별시)',
  })
  @Expose()
  region: string;

  @ApiProperty({
    type: String,
    description: '(소)도시',
  })
  @Expose()
  city: string;

  @ApiProperty({
    type: String,
    description: '구글맵 제공 간략 주소 or 수동 입력 주소',
  })
  @Expose()
  shortAddress: string;

  @ApiProperty({
    type: String,
    description: '구글맵 제공 상세 주소',
  })
  @Expose()
  fullAddress: string;

  id: string;
}
