import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheInterceptor implements NestInterceptor {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const key = this.generateCacheKey(request);
    // console.log(key);
    // Redis에서 캐시된 데이터를 조회
    const cachedData = await this.redis.get(key);
    if (cachedData) {
      // 캐시된 데이터가 있으면, 해당 데이터를 반환
      return of(JSON.parse(cachedData));
    }

    // 캐시된 데이터가 없으면, 다음 핸들러로 넘기고 데이터 캐싱
    return next.handle().pipe(
      tap(async (data) => {
        // 응답 데이터를 Redis에 캐싱
        await this.redis.set(key, JSON.stringify(data), 'EX', 1800);
      }),
    );
  }

  // 요청에 기반한 캐시 키 생성 로직 (필요에 따라 변경 가능)
  private generateCacheKey(request: any): string {
    const { method, url, query } = request;
    let returnKey = '';
    if (url.includes('/api/runningInfo/getAll')) {
      // 전체 페이지 조회 - databaseList
      let searchText = '';
      let searchTOW = '';
      if (query?.testType) {
        searchTOW += query.testType;
      }
      if (query?.title) {
        searchTOW += query.title;
      }
      if (query?.wbcCountOrder) {
        searchTOW += query.wbcCountOrder;
      }

      if (query.barcodeNo) {
        searchText = query.barcodeNo;
      } else if (query.patientId) {
        searchText = query.patientId;
      } else if (query.patientNm) {
        searchText = query.patientNm;
      }

      if (searchText !== '') {
        returnKey =
          query.startDay +
          query.endDay +
          query.page +
          searchText +
          query.nrCount +
          searchTOW;
      } else {
        returnKey =
          query.startDay +
          query.endDay +
          query.page +
          query.nrCount +
          searchTOW;
      }
    } else {
      // database detail
      returnKey = `${method}:${url}?${new URLSearchParams(query).toString()}`;
    }
    // console.log('returnKey', returnKey);
    return returnKey;
  }
}
