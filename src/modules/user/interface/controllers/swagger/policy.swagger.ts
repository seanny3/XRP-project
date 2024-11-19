import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperator } from '@swagger/type/swagger.type';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseBuilder } from '@swagger/builder/response.builder';
import { GetPolicyDto } from '@user/application/dtos/get-policy.dto';
import { PolicyController } from '@user/interface/controllers/policy.controller';
import { GetPolicyResponseDto } from '@user/interface/dtos/response/get-policy.response.dto';

export const ApiPolicy: ApiOperator<keyof PolicyController> = {
  GetPolicies: (
    apiOperationOptions: Required<Pick<Partial<OperationObject>, 'summary'>> &
      Partial<OperationObject>,
  ): PropertyDecorator => {
    return applyDecorators(
      ApiOperation(apiOperationOptions),
      ResponseBuilder.swaggerBuilder(
        HttpStatus.OK,
        'GetPolicies',
        GetPolicyResponseDto,
        { isArray: true },
      ),
    );
  },
};
