import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { HeaderObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptions,
  ApiResponse,
} from '@nestjs/swagger';

export class ResponseBuilder {
  static swaggerBuilder(
    status: Exclude<HttpStatus, ErrorHttpStatusCode>,
    key: string,
    type: Type,
    options: Omit<ApiPropertyOptions, 'name' | 'type'> = {},
    headers?: Record<string, HeaderObject>,
  ) {
    class Temp extends this {
      @ApiProperty({
        name: 'statusCode',
        example: `${status}`,
        enum: HttpStatus,
      })
      private readonly statusCode: number;

      @ApiProperty({
        name: 'data',
        type,
        ...options,
      })
      private readonly data: string;
    }

    Object.defineProperty(Temp, 'name', {
      value: `${key}ResponseDto`,
    });

    return applyDecorators(
      ApiExtraModels(type),
      ApiResponse({ status, type: Temp, headers }),
    );
  }
}
