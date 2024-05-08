import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from '../cache/CacheService';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly cacheService: CacheService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    // const response = httpContext.getResponse();

    // 요청의 메서드와 경로를 사용하여 캐시 키를 생성합니다.
    const cacheKey = this.generateCacheKey(request);

    // 요청 메서드에 따라 캐시 조작을 구분합니다.
    switch (request.method) {
      case 'GET':
        // GET 요청일 때 캐시에서 데이터 조회
        const cachedData = this.cacheService.get(cacheKey);
        if (cachedData !== undefined) {
          // 캐시에 데이터가 있는 경우, 바로 응답 반환
          return new Observable((subscriber) => {
            subscriber.next(cachedData);
            subscriber.complete();
          });
        }
        break;

      case 'PUT':
        // PUT 요청일 때 캐시에서 데이터 저장
        return next.handle().pipe(
          tap((data) => {
            // 응답 데이터 저장
            this.cacheService.set(cacheKey, data);
          }),
        );

      case 'DELETE':
        // DELETE 요청일 때 캐시에서 데이터 삭제
        this.cacheService.delete(cacheKey);
        break;

      default:
        // 다른 요청은 다음 핸들러로 전달
        break;
    }

    // 요청 처리 계속 진행
    return next.handle();
  }

  // 요청을 기반으로 캐시 키 생성
  private generateCacheKey(request: any): string {
    // 요청 경로와 매개변수를 조합하여 캐시 키 생성
    return `${request.method}:${request.url}`;
  }
}
