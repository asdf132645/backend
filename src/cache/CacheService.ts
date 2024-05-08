import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  private cache = new Map<string, any>();

  // 캐시 데이터 조회
  get(cacheKey: string): any {
    return this.cache.get(cacheKey);
  }

  // 캐시 데이터 저장
  set(cacheKey: string, data: any): void {
    this.cache.set(cacheKey, data);
  }

  // 캐시 데이터 삭제
  delete(cacheKey: string): void {
    this.cache.delete(cacheKey);
  }
}
