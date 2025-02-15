import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  constructor() {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const statusCode = context.getArgByIndex(1).statusCode;

    return next.handle().pipe(
      map((data) => {
        return { statusCode, data };
      }),
    );
  }
}
