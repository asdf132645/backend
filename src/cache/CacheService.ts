import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  private cache = new Map<string, any>();

  get(cacheKey: string): any {
    return this.cache.get(cacheKey);
  }

  set(cacheKey: string, data: any): void {
    try {
      this.cache.set(cacheKey, data);
      console.log(`Data set in cache for key: ${cacheKey}`);
    } catch (error) {
      console.error(`Error setting data in cache for key: ${cacheKey}`, error);
    }
  }

  delete(cacheKey: string): void {
    try {
      this.cache.delete(cacheKey);
      console.log(`Cache entry deleted for key: ${cacheKey}`);
    } catch (error) {
      console.error(`Error deleting cache entry for key: ${cacheKey}`, error);
    }
  }
}
