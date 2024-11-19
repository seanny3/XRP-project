import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperator } from '@swagger/type/swagger.type';
import { ApiOperation } from '@nestjs/swagger';
import { NoContentResponseBuilder } from '@swagger/builder/no-content-response.builder';
import { TokenConfigBuilder } from '@swagger/builder/token-config.builder';
import { ExceptionBuilder } from '@swagger/builder/exception.builder';
import {
  UserExceptionEnum,
  UserExceptionMessage,
} from '@exception/enum/user.enum';
import { HttpExceptionStatus } from '@exception/enum/http-status.enum';
import { LikeController } from '@user/interface/controllers/like.controller';

export const ApiLike: ApiOperator<keyof LikeController> = {
  Like: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      NoContentResponseBuilder.swaggerBuilder(HttpStatus.OK, 'Like'),
      TokenConfigBuilder.swaggerBuilder(),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.BAD_REQUEST, [
        {
          errorCode: UserExceptionEnum.CannotLikeSelf,
          description: UserExceptionMessage.CannotLikeSelf,
        },
      ]),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.CONFLICT, [
        {
          errorCode: UserExceptionEnum.LikeAlreadyExist,
          description: UserExceptionMessage.LikeAlreadyExist,
        },
      ]),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.NOT_FOUND, [
        {
          errorCode: UserExceptionEnum.LikeTargetUserNotFound,
          description: UserExceptionMessage.LikeTargetUserNotFound,
        },
      ]),
    );
  },

  Unlike: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      NoContentResponseBuilder.swaggerBuilder(HttpStatus.OK, 'Unlike'),
      TokenConfigBuilder.swaggerBuilder(),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.BAD_REQUEST, [
        {
          errorCode: UserExceptionEnum.CannotUnlikeSelf,
          description: UserExceptionMessage.CannotUnlikeSelf,
        },
      ]),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.NOT_FOUND, [
        {
          errorCode: UserExceptionEnum.LikeNotFound,
          description: UserExceptionMessage.LikeNotFound,
        },
        {
          errorCode: UserExceptionEnum.LikeTargetUserNotFound,
          description: UserExceptionMessage.LikeTargetUserNotFound,
        },
      ]),
    );
  },
};
