import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiPropertyOptions,
} from '@nestjs/swagger';

export class MultipartFormDataBuilder {
  static swaggerBuilder(
    key: string,
    fileKey: string,
    type: Type,
    options: Omit<ApiPropertyOptions, 'name' | 'type'> = {},
  ) {
    class Temp extends this {
      @ApiProperty({
        name: fileKey,
        type: 'string',
        format: 'binary',
        ...options,
      })
      private readonly file: string;

      @ApiProperty({
        name: 'data',
        type,
      })
      private readonly data: string;
    }

    Object.defineProperty(Temp, 'name', {
      value: `${key}FormDataDto`,
    });

    return applyDecorators(
      ApiConsumes('multipart/form-data'),
      ApiBody({
        type: Temp,
      }),
      ApiConsumes('application/json'),
      ApiBody({
        type,
      }),
    );
  }
}
