import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperator } from '@swagger/type/swagger.type';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseBuilder } from '@swagger/builder/response.builder';
import { GetTpaDto } from '@user/application/dtos/get-tpa.dto';
import { NoContentResponseBuilder } from '@swagger/builder/no-content-response.builder';
import { TokenConfigBuilder } from '@swagger/builder/token-config.builder';
import { ExceptionBuilder } from '@swagger/builder/exception.builder';
import {
  UserExceptionEnum,
  UserExceptionMessage,
} from '@exception/enum/user.enum';
import { HttpExceptionStatus } from '@exception/enum/http-status.enum';
import { MyTpaController } from '@user/interface/controllers/my-tpa.controller';
import { GetTpaResponseDto } from '@user/interface/dtos/response/get-tpa.response.dto';

export const ApiMyTpa: ApiOperator<keyof MyTpaController> = {
  GetTpaList: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      ResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'GtThirdPartyAccounts',
        GetTpaResponseDto,
        { isArray: true },
      ),
      TokenConfigBuilder.swaggerBuilder(),
    );
  },

  LinkTpa: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      NoContentResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'LinkThirdPartyAccount',
      ),
      TokenConfigBuilder.swaggerBuilder(),
    );
  },

  UnlinkTpa: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      NoContentResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'UnlinkThirdPartyAccount',
      ),
      TokenConfigBuilder.swaggerBuilder(),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.NOT_FOUND, [
        {
          errorCode: UserExceptionEnum.ThirdPartyAccountNotFound,
          description: UserExceptionMessage.ThirdPartyAccountNotFound,
        },
      ]),
    );
  },
};
