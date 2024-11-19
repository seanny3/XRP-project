import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ApiOperator } from '@swagger/type/swagger.type';
import { ExceptionBuilder } from '@swagger/builder/exception.builder';
import { HttpExceptionStatus } from '@exception/enum/http-status.enum';
import {
  UserExceptionEnum,
  UserExceptionMessage,
} from '@exception/enum/user.enum';
import { NoContentResponseBuilder } from '@swagger/builder/no-content-response.builder';
import {
  PolicyExceptionEnum,
  PolicyExceptionMessage,
} from '@exception/enum/policy.enum';
import {
  ApiCookieAuthTokenType,
  TokenConfigBuilder,
} from '@swagger/builder/token-config.builder';
import { ResponseBuilder } from '@swagger/builder/response.builder';
import { UserController } from '@user/interface/controllers/user.controller';
import { UploadAvatarBodyDto } from '@user/interface/dtos/request/upload-avatar.body.dto';
import { GetS3KeyResponseDto } from '@user/interface/dtos/response/get-s3-key.response.dto';
import {
  GlobalExceptionEnum,
  GlobalExceptionMessage,
} from '@exception/enum/global.enum';

export const ApiUser: ApiOperator<keyof UserController> = {
  Register: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      TokenConfigBuilder.swaggerBuilder(
        ApiCookieAuthTokenType.CREATE_USER_TOKEN,
      ),
      NoContentResponseBuilder.swaggerBuilder(HttpStatus.OK, 'Register', {
        'Set-Cookie': {
          description: '액세스토큰',
          schema: {
            type: 'string',
            example: 'accessToken=; Path=/; Secure; HttpOnly; Expires={now};',
          },
        },
        'Set-Cookie ': {
          description: '리프레시토큰',
          schema: {
            type: 'string',
            example: 'refreshToken=; Path=/; Secure; HttpOnly; Expires={now};',
          },
        },
      }),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.CONFLICT, [
        {
          errorCode: UserExceptionEnum.UserAlreadyExist,
          description: UserExceptionMessage.UserAlreadyExist,
        },
      ]),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.BAD_REQUEST, [
        {
          errorCode: PolicyExceptionEnum.PolicyNotFound,
          description: PolicyExceptionMessage.PolicyNotFound,
        },
        {
          errorCode: PolicyExceptionEnum.PolicyIdInvalid,
          description: PolicyExceptionMessage.PolicyIdInvalid,
        },
        {
          errorCode: PolicyExceptionEnum.NotAgreedRequiredPolicy,
          description: PolicyExceptionMessage.NotAgreedRequiredPolicy,
        },
      ]),
    );
  },

  UploadAvatar: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      ApiConsumes('multipart/form-data'),
      ApiBody({ type: UploadAvatarBodyDto }),
      ResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'UploadAvatar',
        GetS3KeyResponseDto,
      ),
      ExceptionBuilder.swaggerBuilder(
        HttpExceptionStatus.INTERNAL_SERVER_ERROR,
        [
          {
            errorCode: GlobalExceptionEnum.MulterRequestError,
            description: GlobalExceptionMessage.MulterRequestError,
          },
        ],
      ),
    );
  },

  CheckDuplicateUserHandle: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      NoContentResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'CheckDuplicateUserHandle',
      ),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.CONFLICT, [
        {
          errorCode: UserExceptionEnum.AlreadyUsedHandle,
          description: UserExceptionMessage.AlreadyUsedHandle,
        },
      ]),
    );
  },

  CheckDuplicateUserEmail: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      NoContentResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'CheckDuplicateUserEmail',
      ),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.CONFLICT, [
        {
          errorCode: UserExceptionEnum.AlreadyUsedEmail,
          description: UserExceptionMessage.AlreadyUsedEmail,
        },
      ]),
    );
  },
};
