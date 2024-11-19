import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { applyDecorators } from '@nestjs/common';
import { ApiOperator } from '@swagger/type/swagger.type';
import { PolicyController } from '@admin/interface/controllers/policy.controller';
import { ApiOperation } from '@nestjs/swagger';
import { TokenConfigBuilder } from '@swagger/builder/token-config.builder';
import { ExceptionBuilder } from '@swagger/builder/exception.builder';
import { HttpExceptionStatus } from '@exception/enum/http-status.enum';
import {
  PolicyExceptionEnum,
  PolicyExceptionMessage,
} from '@exception/enum/policy.enum';

export const ApiPolicy: ApiOperator<keyof PolicyController> = {
  CreatePolicy: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      TokenConfigBuilder.swaggerBuilder(),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.CONFLICT, [
        {
          errorCode: PolicyExceptionEnum.PolicyAlreadyExist,
          description: PolicyExceptionMessage.PolicyAlreadyExist,
        },
      ]),
    );
  },

  DeletePolicy: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      TokenConfigBuilder.swaggerBuilder(),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.NOT_FOUND, [
        {
          errorCode: PolicyExceptionEnum.PolicyNotFound,
          description: PolicyExceptionMessage.PolicyNotFound,
        },
      ]),
    );
  },

  UpdatePolicy: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      TokenConfigBuilder.swaggerBuilder(),
      ExceptionBuilder.swaggerBuilder(HttpExceptionStatus.NOT_FOUND, [
        {
          errorCode: PolicyExceptionEnum.PolicyNotFound,
          description: PolicyExceptionMessage.PolicyNotFound,
        },
      ]),
    );
  },
};
