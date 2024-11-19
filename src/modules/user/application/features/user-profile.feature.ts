import { Injectable } from '@nestjs/common';
import { UserService } from '@user/application/services/user.service';
import { UpdateProfileRequestBodyDto } from '@user/interface/dtos/request/update-profile.body.dto';
import { PrismaService } from '@persistence/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from '@user/application/dtos/update-user.dto';
import { UserTagService } from '@user/application/services/user-tag.service';
import { GetUserProfileResponseDto } from '@user/interface/dtos/response/get-user-profile.response.dto';
import { GetMyProfileResponseDto } from '@user/interface/dtos/response/get-my-profile.reponse.dto';
import { UserLocationService } from '@user/application/services/user-location.service';
import { UpsertUserLocationDto } from '@user/application/dtos/upsert-user-location.dto';
import { NotFoundException } from '@exception/custom/not-found.exception';
import { UserExceptionEnum } from '@exception/enum/user.enum';
import { UserSocialService } from '@user/application/services/user-social.service';
import { UpsertUserSocialDto } from '@user/application/dtos/upsert-user-social.dto';

@Injectable()
export class UserProfileFeature {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly userTagService: UserTagService,
    private readonly userLocationService: UserLocationService,
    private readonly userSocialService: UserSocialService,
  ) {}

  async getUserProfileByHandle(
    handle: string,
  ): Promise<GetUserProfileResponseDto> {
    const foundUser = await this.userService.getUserByHandle(handle);
    if (!foundUser) {
      throw new NotFoundException(UserExceptionEnum.UserNotFound);
    }
    return plainToInstance(GetUserProfileResponseDto, foundUser);
  }

  async getMyProfile(userId: string): Promise<GetMyProfileResponseDto> {
    const foundUser = await this.userService.getUserById(userId);
    return plainToInstance(GetMyProfileResponseDto, foundUser);
  }

  async getMyLikedUserList(
    userId: string,
  ): Promise<GetUserProfileResponseDto[]> {
    const foundUsers = await this.userService.getLikedUsersByUserId(userId);
    return plainToInstance(GetUserProfileResponseDto, foundUsers);
  }

  async updateProfile(
    userId: string,
    updateProfileRequestBodyDto: UpdateProfileRequestBodyDto,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const updateUserDto = plainToInstance(
        UpdateUserDto,
        updateProfileRequestBodyDto,
      );
      await this.userService.updateUser(userId, updateUserDto, tx);

      // 태그 수정
      if (updateProfileRequestBodyDto.tags) {
        await this.userTagService.checkDuplicateUserTag(
          updateProfileRequestBodyDto.tags,
        );
        await this.userTagService.updateUserTag(
          userId,
          updateProfileRequestBodyDto.tags,
          tx,
        );
      }

      // 소셜 수정
      if (updateProfileRequestBodyDto.socials) {
        // 값이 있으면 수정
        const upsertUserSocialDtoArr = plainToInstance(
          UpsertUserSocialDto,
          updateProfileRequestBodyDto.socials,
        );
        await this.userSocialService.checkDuplicateSocialType(
          upsertUserSocialDtoArr,
        );
        await this.userSocialService.upsertUserSocials(
          userId,
          upsertUserSocialDtoArr,
          tx,
        );
      } else if (updateProfileRequestBodyDto.socials === null) {
        // 값이 null이면 전체 삭제
        await this.userSocialService.deleteByUserId(userId, tx);
      }

      // 위치 수정
      if (updateProfileRequestBodyDto.location) {
        // 값이 있으면 수정
        const updateUserLocationDto = plainToInstance(
          UpsertUserLocationDto,
          updateProfileRequestBodyDto.location,
        );
        await this.userLocationService.upsertUserLocation(
          userId,
          updateUserLocationDto,
          tx,
        );
      } else if (updateProfileRequestBodyDto.location === null) {
        // 값이 null이면 전체 삭제
        await this.userLocationService.deleteByUserId(userId, tx);
      }
    });
  }
}
