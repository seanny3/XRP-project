import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiOperator } from '@swagger/type/swagger.type';
import { NoContentResponseBuilder } from '@swagger/builder/no-content-response.builder';
import { TokenConfigBuilder } from '@swagger/builder/token-config.builder';
import { ResponseBuilder } from '@swagger/builder/response.builder';
import { GetUserProfileResponseDto } from '@user/interface/dtos/response/get-user-profile.response.dto';
import { ProfileController } from '@user/interface/controllers/profile.controller';
import { ExceptionBuilder } from '@swagger/builder/exception.builder';
import {
  UserExceptionEnum,
  UserExceptionMessage,
} from '@exception/enum/user.enum';
import { HttpExceptionStatus } from '@exception/enum/http-status.enum';
import { GetMyProfileResponseDto } from '@user/interface/dtos/response/get-my-profile.reponse.dto';

export const ApiProfile: ApiOperator<keyof ProfileController> = {
  GetUserProfileByHandle: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      ResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'GetProfileByHandle',
        GetUserProfileResponseDto,
      ),
      TokenConfigBuilder.swaggerBuilder(),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.NOT_FOUND, [
        {
          errorCode: UserExceptionEnum.UserNotFound,
          description: UserExceptionMessage.UserNotFound,
        },
      ]),
    );
  },

  GetMyProfile: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      TokenConfigBuilder.swaggerBuilder(),
      ResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'GetMyProfileWrapper',
        GetMyProfileResponseDto,
      ),
    );
  },

  UpdateProfile: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      TokenConfigBuilder.swaggerBuilder(),
      NoContentResponseBuilder.swaggerBuilder(HttpStatus.OK, 'UpdateProfile'),
    );
  },

  GetMyLikedUserList: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      ResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'GetMyLikedUserList',
        GetUserProfileResponseDto,
        {
          isArray: true,
        },
      ),
      TokenConfigBuilder.swaggerBuilder(),
    );
  },
};
