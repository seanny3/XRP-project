import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { HttpExceptionStatus } from '@exception/enum/http-status.enum';

export class ExceptionBuilder {
  [key: string]: unknown;

  static swaggerBuilder(
    status: HttpExceptionStatus,
    errors: { errorCode: string; description: string }[],
  ) {
    const examples = {};

    errors.forEach(({ errorCode, description }) => {
      examples[errorCode] = {
        value: { statusCode: status, errorCode, description },
      };
    });

    return applyDecorators(
      ApiResponse({
        status,
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
