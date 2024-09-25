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
    const type = context.getType<string>();
    const isGraphQL = type === 'graphql'; // GraphQL 요청인지 확인

    return next.handle().pipe(
      map((data) => {
        if (isGraphQL) {
          return data;
        } else {
          // HTTP 응답 형식
          const httpResponse = context.switchToHttp().getResponse();
          const success =
            httpResponse.statusCode >= 200 && httpResponse.statusCode < 300;
          const code = httpResponse.statusCode;

          // null 데이터 처리
          if (data === null) {
            return {
              success,
              data: {}, // 빈 객체로 응답
              code,
            };
          }

          return {
            success,
            data,
            code,
          };
        }
      }),
    );
  }
}
