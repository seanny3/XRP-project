import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiOperator } from '@swagger/type/swagger.type';
import { ExceptionBuilder } from '@swagger/builder/exception.builder';
import { HttpExceptionStatus } from '@exception/enum/http-status.enum';
import {
  AuthExceptionEnum,
  AuthExceptionMessage,
} from '@exception/enum/auth.enum';
import {
  MailExceptionEnum,
  MailExceptionMessage,
} from '@exception/enum/mail.enum';
import {
  GlobalExceptionEnum,
  GlobalExceptionMessage,
} from '@exception/enum/global.enum';
import {
  ApiCookieAuthTokenType,
  TokenConfigBuilder,
} from '@swagger/builder/token-config.builder';
import {
  UserExceptionEnum,
  UserExceptionMessage,
} from '@exception/enum/user.enum';
import { NoContentResponseBuilder } from '@swagger/builder/no-content-response.builder';
import { ResponseBuilder } from '@swagger/builder/response.builder';
import { GetAuthTokensResponseDto } from '@user/interface/dtos/response/get-auth-tokens.response.dto';
import { AuthController } from '@user/interface/controllers/auth.controller';

export const ApiAuth: ApiOperator<keyof AuthController> = {
  SendOtpByEmail: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      NoContentResponseBuilder.swaggerBuilder(HttpStatus.OK, 'SendOtpByEmail'),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.BAD_REQUEST, [
        {
          errorCode: AuthExceptionEnum.TooManySendOtpRequest,
          description: AuthExceptionMessage.TooManySendOtpRequest,
        },
        {
          errorCode: AuthExceptionEnum.BlockedSendOtpRequest,
          description: AuthExceptionMessage.BlockedSendOtpRequest,
        },
      ]),
      ExceptionBuilder.swaggerBuilder(
        HttpExceptionStatus.INTERNAL_SERVER_ERROR,
        [
          {
            errorCode: MailExceptionEnum.MailClientRequestError,
            description: MailExceptionMessage.MailClientRequestError,
          },
          {
            errorCode: GlobalExceptionEnum.CacheClientRequestError,
            description: GlobalExceptionMessage.CacheClientRequestError,
          },
        ],
      ),
    );
  },

  GetAuthTokensByEmail: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      ApiBasicAuth('emailAuth'),
      ResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'GetAuthTokensByEmail',
        GetAuthTokensResponseDto,
        null,
        {
          'Set-Cookie': {
            description: '액세스토큰',
            schema: {
              type: 'string',
              example:
                'accessToken=eyJ123; Path=/; Secure; HttpOnly; Expires={now+30minutes};',
            },
          },
          'Set-Cookie ': {
            description: '리프레시토큰',
            schema: {
              type: 'string',
              example:
                'refreshToken=eyJ456; Path=/; Secure; HttpOnly; Expires={now+1month};',
            },
          },
        },
      ),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.UNAUTHORIZED, [
        {
          errorCode: UserExceptionEnum.UserNotFound,
          description: UserExceptionMessage.UserNotFound,
        },
        {
          errorCode: AuthExceptionEnum.MissingCredentials,
          description: AuthExceptionMessage.MissingCredentials,
        },
        {
          errorCode: AuthExceptionEnum.InvalidOtp,
          description: AuthExceptionMessage.InvalidOtp,
        },
        {
          errorCode: AuthExceptionEnum.TooManyVerificationRequest,
          description: AuthExceptionMessage.TooManyVerificationRequest,
        },
        {
          errorCode: AuthExceptionEnum.BlockedVerificationRequest,
          description: AuthExceptionMessage.BlockedVerificationRequest,
        },
      ]),
      ExceptionBuilder.swaggerBuilder(
        HttpExceptionStatus.INTERNAL_SERVER_ERROR,
        [
          {
            errorCode: GlobalExceptionEnum.CacheClientRequestError,
            description: GlobalExceptionMessage.CacheClientRequestError,
          },
          {
            errorCode: AuthExceptionEnum.FailedToIssueToken,
            description: AuthExceptionMessage.FailedToIssueToken,
          },
        ],
      ),
    );
  },

  GetAuthTokensByOpenAuth: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      ResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'GetAuthTokensByGoogle',
        GetAuthTokensResponseDto,
        null,
        {
          'Set-Cookie': {
            description: '액세스토큰',
            schema: {
              type: 'string',
              example:
                'accessToken=eyJ123; Path=/; Secure; HttpOnly; Expires={now+30minutes};',
            },
          },
          'Set-Cookie ': {
            description: '리프레시토큰',
            schema: {
              type: 'string',
              example:
                'refreshToken=eyJ456; Path=/; Secure; HttpOnly; Expires={now+1month};',
            },
          },
        },
      ),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.BAD_REQUEST, [
        {
          errorCode: AuthExceptionEnum.UnsupportedProvider,
          description: AuthExceptionMessage.UnsupportedProvider,
        },
      ]),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.UNAUTHORIZED, [
        {
          errorCode: UserExceptionEnum.UserNotFound,
          description: UserExceptionMessage.UserNotFound,
        },
        {
          errorCode: AuthExceptionEnum.InvalidOAuthToken,
          description: AuthExceptionMessage.InvalidOAuthToken,
        },
        {
          errorCode: AuthExceptionEnum.MissingCredentials,
          description: AuthExceptionMessage.MissingCredentials,
        },
        {
          errorCode: AuthExceptionEnum.InvalidOtp,
          description: AuthExceptionMessage.InvalidOtp,
        },
        {
          errorCode: AuthExceptionEnum.TooManyVerificationRequest,
          description: AuthExceptionMessage.TooManyVerificationRequest,
        },
        {
          errorCode: AuthExceptionEnum.BlockedVerificationRequest,
          description: AuthExceptionMessage.BlockedVerificationRequest,
        },
      ]),
      ExceptionBuilder.swaggerBuilder(
        HttpExceptionStatus.INTERNAL_SERVER_ERROR,
        [
          {
            errorCode: GlobalExceptionEnum.CacheClientRequestError,
            description: GlobalExceptionMessage.CacheClientRequestError,
          },
          {
            errorCode: AuthExceptionEnum.FailedToIssueToken,
            description: AuthExceptionMessage.FailedToIssueToken,
          },
        ],
      ),
    );
  },

  DeleteAuthTokens: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      NoContentResponseBuilder.swaggerBuilder(HttpStatus.OK, 'DeleteTokens', {
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
      TokenConfigBuilder.swaggerBuilder(),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.FORBIDDEN, [
        {
          errorCode: AuthExceptionEnum.UnauthorizedAccess,
          description: AuthExceptionMessage.UnauthorizedAccess,
        },
      ]),
    );
  },

  RefreshAuthTokens: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      ResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'RefreshTokens',
        GetAuthTokensResponseDto,
        null,
        {
          'Set-Cookie': {
            description: '액세스토큰',
            schema: {
              type: 'string',
              example:
                'accessToken=eyJ321; Path=/; Secure; HttpOnly; Expires={now+30minutes};',
            },
          },
          'Set-Cookie ': {
            description: '리프레시토큰',
            schema: {
              type: 'string',
              example:
                'refreshToken=eyJ654; Path=/; Secure; HttpOnly; Expires={now+1month};',
            },
          },
        },
      ),
      TokenConfigBuilder.swaggerBuilder(ApiCookieAuthTokenType.REFRESH_TOKEN),
      ExceptionBuilder.swaggerBuilder(
        HttpExceptionStatus.INTERNAL_SERVER_ERROR,
        [
          {
            errorCode: GlobalExceptionEnum.CacheClientRequestError,
            description: GlobalExceptionMessage.CacheClientRequestError,
          },
          {
            errorCode: AuthExceptionEnum.FailedToIssueToken,
            description: AuthExceptionMessage.FailedToIssueToken,
          },
        ],
      ),
    );
  },
};
