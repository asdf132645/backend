export declare class CacheService {
    private cache;
    get(cacheKey: string): any;
    set(cacheKey: string, data: any): void;
    delete(cacheKey: string): void;
}
