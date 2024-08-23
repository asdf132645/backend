import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import Redis from 'ioredis';
export declare class RedisCacheInterceptor implements NestInterceptor {
    private readonly redis;
    constructor(redis: Redis);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    private generateCacheKey;
}
