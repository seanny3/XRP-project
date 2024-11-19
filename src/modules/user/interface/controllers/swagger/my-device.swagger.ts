import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperator } from '@swagger/type/swagger.type';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseBuilder } from '@swagger/builder/response.builder';
import { NoContentResponseBuilder } from '@swagger/builder/no-content-response.builder';
import { TokenConfigBuilder } from '@swagger/builder/token-config.builder';
import { ExceptionBuilder } from '@swagger/builder/exception.builder';
import {
  UserExceptionEnum,
  UserExceptionMessage,
} from '@exception/enum/user.enum';
import { HttpExceptionStatus } from '@exception/enum/http-status.enum';
import { GetUserDeviceDto } from '@user/application/dtos/get-user-device.dto';
import { MyDeviceController } from '@user/interface/controllers/my-device.controller';
import { GetUserDeviceResponseDto } from '@user/interface/dtos/response/get-user-device.response.dto';

export const ApiMyDevice: ApiOperator<keyof MyDeviceController> = {
  GetMyDevices: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      ResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'GetDevices',
        GetUserDeviceResponseDto,
        { isArray: true },
      ),
      TokenConfigBuilder.swaggerBuilder(),
    );
  },

  UnlinkMyDevice: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      NoContentResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'UnlinkUserDevice',
      ),
      TokenConfigBuilder.swaggerBuilder(),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.NOT_FOUND, [
        {
          errorCode: UserExceptionEnum.UserDeviceNotFound,
          description: UserExceptionMessage.UserDeviceNotFound,
        },
      ]),
    );
  },
};
