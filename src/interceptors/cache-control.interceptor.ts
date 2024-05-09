import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CacheService } from '../cache/CacheService';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly cacheService: CacheService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const cacheKey = this.generateCacheKey(request);

    if (request.method === 'GET') {
      const cachedData = this.cacheService.get(cacheKey);
      if (cachedData !== undefined) {
        // 캐시에 데이터가 있는 경우, 캐시 데이터를 반환
        return of(cachedData);
      }
    }

    return next.handle().pipe(
      tap((data) => {
        if (request.method === 'PUT') {
          // 응답 데이터가 성공적으로 처리된 후 캐시에 저장
          this.cacheService.set(cacheKey, data);
        }
      }),
      catchError((error) => {
        console.error(`Error handling request: ${error.message}`);
        return of(null);
      }),
    );
  }

  private generateCacheKey(request: any): string {
    // 요청 경로와 매개변수를 조합하여 캐시 키 생성
    return `${request.method}:${request.url}`;
  }
}
