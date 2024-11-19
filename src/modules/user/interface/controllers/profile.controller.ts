import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Query,
} from '@nestjs/common';
import { Member } from '@shared/security/roles/member.role.decorator';
import { User } from '@shared/decorators/user.request.decorator';
import { AuthTokenPayloadDto } from '@user/interface/dtos/common/auth-token-payload.dto';
import { UpdateProfileRequestBodyDto } from '@user/interface/dtos/request/update-profile.body.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserProfileFeature } from '@user/application/features/user-profile.feature';
import { GetUserProfileResponseDto } from '@user/interface/dtos/response/get-user-profile.response.dto';
import { ApiProfile } from '@user/interface/controllers/swagger/profile.swagger';
import { GetMyProfileResponseDto } from '@user/interface/dtos/response/get-my-profile.reponse.dto';
import { UserHandleQueryDto } from '@user/interface/dtos/request/user-handle.query.dto';

@ApiTags('User')
@Controller()
@Member()
export class ProfileController {
  constructor(private readonly userProfileFeature: UserProfileFeature) {}

  // TODO: 상대방 프로필 조회 접근권한 확인 필요
  @ApiProfile.GetUserProfileByHandle({
    summary: '유저 Handle로 프로필 조회 ✅',
  })
  @Get('users/profile')
  @Member()
  @HttpCode(HttpStatus.OK)
  async getUserProfileByHandle(
    @Query() { handle }: UserHandleQueryDto,
  ): Promise<GetUserProfileResponseDto> {
    return this.userProfileFeature.getUserProfileByHandle(handle);
  }

  @ApiProfile.GetMyProfile({ summary: '내 프로필 조회 ✅' })
  @Get('me/profile')
  @HttpCode(HttpStatus.OK)
  async getMyProfile(
    @User() payload: AuthTokenPayloadDto,
  ): Promise<GetMyProfileResponseDto> {
    return this.userProfileFeature.getMyProfile(payload.userId);
  }

  @ApiProfile.UpdateProfile({ summary: '내 프로필 수정 ✅' })
  @Patch('me/profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @User() payload: AuthTokenPayloadDto,
    @Body() updateProfileRequestBodyDto: UpdateProfileRequestBodyDto,
  ): Promise<void> {
    await this.userProfileFeature.updateProfile(
      payload.userId,
      updateProfileRequestBodyDto,
    );
  }

  @ApiProfile.GetMyLikedUserList({ summary: '내가 Like한 유저 목록 조회 ✅' })
  @Get('me/likes/users')
  @HttpCode(HttpStatus.OK)
  async getMyLikedUserList(
    @User() payload: AuthTokenPayloadDto,
  ): Promise<GetUserProfileResponseDto[]> {
    return await this.userProfileFeature.getMyLikedUserList(payload.userId);
  }
}
