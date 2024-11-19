import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { HeaderObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export class NoContentResponseBuilder {
  [key: string]: unknown;

  static swaggerBuilder(
    status: Exclude<HttpStatus, ErrorHttpStatusCode>,
    key: string,
    headers?: Record<string, HeaderObject>,
  ) {
    class Temp extends this {
      @ApiProperty({
        name: 'statusCode',
        example: `${status}`,
        enum: HttpStatus,
      })
      private readonly status: string;
    }

    Object.defineProperty(Temp, 'name', {
      value: `${key}NoContentResponseDto`,
    });
    return applyDecorators(
      ApiResponse({
        status,
        type: Temp,
        headers,
      }),
    );
  }

  constructor(res: { [key: string]: unknown }) {
    Object.assign(this, res);
  }
}
