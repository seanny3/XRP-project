import { applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiResponse } from '@nestjs/swagger';
import { HttpExceptionStatus } from '@exception/enum/http-status.enum';
import {
  AuthExceptionEnum,
  AuthExceptionMessage,
} from '@exception/enum/auth.enum';

export class TokenConfigBuilder {
  static swaggerBuilder(
    type: ApiCookieAuthTokenType = ApiCookieAuthTokenType.ACCESS_TOKEN,
  ) {
    const examples = Object.keys(TokenExceptionEnum).reduce((acc, key) => {
      const errorCode = TokenExceptionEnum[key];
      acc[errorCode] = {
        value: {
          statusCode: HttpExceptionStatus.UNAUTHORIZED,
          errorCode,
          description: TokenExceptionMessage[key],
        },
      };
      return acc;
    }, {});

    return applyDecorators(
      ApiCookieAuth(type),
      ApiResponse({
        status: HttpExceptionStatus.UNAUTHORIZED,
        description:
          '**주의🚨 description은 해당 에러에 대한 설명입니다. 실제 반환값에는 포함되지 않습니다**',
        content: {
          'application-json': {
            examples,
          },
        },
      }),
    );
  }
}

export enum ApiCookieAuthTokenType {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  CREATE_USER_TOKEN = 'createUserToken',
}

enum TokenExceptionEnum {
  InvalidTokenAccess = AuthExceptionEnum.InvalidTokenAccess,
  TokenNotFound = AuthExceptionEnum.TokenNotFound,
  JsonWebTokenError = AuthExceptionEnum.JsonWebTokenError,
  TokenExpiredError = AuthExceptionEnum.TokenExpiredError,
  NotBeforeError = AuthExceptionEnum.NotBeforeError,
  InvalidToken = AuthExceptionEnum.InvalidToken,
}

enum TokenExceptionMessage {
  InvalidTokenAccess = AuthExceptionMessage.InvalidTokenAccess,
  TokenNotFound = AuthExceptionMessage.TokenNotFound,
  JsonWebTokenError = AuthExceptionMessage.JsonWebTokenError,
  TokenExpiredError = AuthExceptionMessage.TokenExpiredError,
  NotBeforeError = AuthExceptionMessage.NotBeforeError,
  InvalidToken = AuthExceptionMessage.InvalidToken,
}
