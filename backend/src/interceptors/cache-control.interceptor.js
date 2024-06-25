"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const CacheService_1 = require("../cache/CacheService");
let CacheInterceptor = class CacheInterceptor {
    constructor(cacheService) {
        this.cacheService = cacheService;
    }
    intercept(context, next) {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const cacheKey = this.generateCacheKey(request);
        if (request.method === 'GET') {
            const cachedData = this.cacheService.get(cacheKey);
            if (cachedData !== undefined) {
                return (0, rxjs_1.of)(cachedData);
            }
        }
        return next.handle().pipe((0, operators_1.tap)((data) => {
            if (request.method === 'PUT') {
                this.cacheService.set(cacheKey, data);
            }
        }), (0, operators_1.catchError)((error) => {
            console.error(`Error handling request: ${error.message}`);
            return (0, rxjs_1.of)(null);
        }));
    }
    generateCacheKey(request) {
        return `${request.method}:${request.url}`;
    }
};
exports.CacheInterceptor = CacheInterceptor;
exports.CacheInterceptor = CacheInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [CacheService_1.CacheService])
], CacheInterceptor);
//# sourceMappingURL=cache-control.interceptor.js.map