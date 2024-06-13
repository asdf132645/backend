import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CacheService } from '../cache/CacheService';
export declare class CacheInterceptor implements NestInterceptor {
    private readonly cacheService;
    constructor(cacheService: CacheService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private generateCacheKey;
}
