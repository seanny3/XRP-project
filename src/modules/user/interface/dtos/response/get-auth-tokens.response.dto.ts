import { ApiProperty } from '@nestjs/swagger';

export class GetAuthTokensResponseDto {
  @ApiProperty({
    type: Boolean,
    description: '신규유저 여부',
    required: false,
  })
  isNewUser: boolean;

  @ApiProperty({
    type: String,
    description: '신규유저에게만 발급되는 회원가입을 위한 토큰',
    required: false,
  })
  createUserToken: string;
}
