import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const httpResponse = context.switchToHttp().getResponse();
        const success =
          httpResponse.statusCode >= 200 && httpResponse.statusCode < 300;
        const code = httpResponse.statusCode;
        return {
          success,
          data,
          code,
        };
      }),
    );
  }
}
