import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Member } from '@shared/security/roles/member.role.decorator';
import { LikeFeature } from '@user/application/features/like.feature';
import { User } from '@shared/decorators/user.request.decorator';
import { AuthTokenPayloadDto } from '@user/interface/dtos/common/auth-token-payload.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserParamDto } from '@user/interface/dtos/request/user.param.dto';
import { ApiLike } from '@user/interface/controllers/swagger/like.swagger';

@ApiTags('User')
@Controller()
@Member()
export class LikeController {
  constructor(private readonly likeFeature: LikeFeature) {}

  @ApiLike.Like({ summary: '유저 Like ✅' })
  @Post('likes/users/:userId')
  @HttpCode(HttpStatus.OK)
  async like(
    @User() payload: AuthTokenPayloadDto,
    @Param() { userId }: UserParamDto,
  ) {
    await this.likeFeature.like(payload.userId, userId);
  }

  @ApiLike.Like({ summary: '유저 Like 해제 ✅' })
  @Delete('likes/users/:userId')
  @HttpCode(HttpStatus.OK)
  async unlike(
    @User() payload: AuthTokenPayloadDto,
    @Param() { userId }: UserParamDto,
  ) {
    await this.likeFeature.unlike(payload.userId, userId);
  }
}
