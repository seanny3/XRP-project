import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperator } from '@swagger/type/swagger.type';
import { ApiOperation } from '@nestjs/swagger';
import { MySettingsController } from '@user/interface/controllers/my-settings.controller';
import { NoContentResponseBuilder } from '@swagger/builder/no-content-response.builder';
import { ExceptionBuilder } from '@swagger/builder/exception.builder';
import {
  UserExceptionEnum,
  UserExceptionMessage,
} from '@exception/enum/user.enum';
import { HttpExceptionStatus } from '@exception/enum/http-status.enum';
import { TokenConfigBuilder } from '@swagger/builder/token-config.builder';

export const ApiMySettings: ApiOperator<keyof MySettingsController> = {
  UpdateMyHandle: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      NoContentResponseBuilder.swaggerBuilder(HttpStatus.OK, 'UpdateMyHandle'),
      TokenConfigBuilder.swaggerBuilder(),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.CONFLICT, [
        {
          errorCode: UserExceptionEnum.UserAlreadyExist,
          description: UserExceptionMessage.UserAlreadyExist,
        },
      ]),
    );
  },
};
