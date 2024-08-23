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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
let RedisCacheInterceptor = class RedisCacheInterceptor {
    constructor(redis) {
        this.redis = redis;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const key = this.generateCacheKey(request);
        const cachedData = await this.redis.get(key);
        if (cachedData) {
            return (0, rxjs_1.of)(JSON.parse(cachedData));
        }
        return next.handle().pipe((0, operators_1.tap)(async (data) => {
            await this.redis.set(key, JSON.stringify(data), 'EX', 1800);
        }));
    }
    generateCacheKey(request) {
        const { method, url, query } = request;
        let returnKey = '';
        if (url.includes('/api/runningInfo/getAll')) {
            let searchText = '';
            if (query.barcodeNo) {
                searchText = query.barcodeNo;
            }
            else if (query.patientId) {
                searchText = query.patientId;
            }
            else if (query.patientNm) {
                searchText = query.patientNm;
            }
            if (searchText !== '') {
                returnKey =
                    query.startDay +
                        query.endDay +
                        query.page +
                        searchText +
                        query.nrCount;
            }
            else {
                returnKey = query.startDay + query.endDay + query.page + query.nrCount;
            }
        }
        else {
            returnKey = `${method}:${url}?${new URLSearchParams(query).toString()}`;
        }
        return returnKey;
    }
};
exports.RedisCacheInterceptor = RedisCacheInterceptor;
exports.RedisCacheInterceptor = RedisCacheInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [ioredis_2.default])
], RedisCacheInterceptor);
//# sourceMappingURL=cache.interceptor.js.map