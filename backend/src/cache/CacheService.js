"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
let CacheService = class CacheService {
    constructor() {
        this.cache = new Map();
    }
    get(cacheKey) {
        return this.cache.get(cacheKey);
    }
    set(cacheKey, data) {
        try {
            this.cache.set(cacheKey, data);
            console.log(`Data set in cache for key: ${cacheKey}`);
        }
        catch (error) {
            console.error(`Error setting data in cache for key: ${cacheKey}`, error);
        }
    }
    delete(cacheKey) {
        try {
            this.cache.delete(cacheKey);
            console.log(`Cache entry deleted for key: ${cacheKey}`);
        }
        catch (error) {
            console.error(`Error deleting cache entry for key: ${cacheKey}`, error);
        }
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = __decorate([
    (0, common_1.Injectable)()
], CacheService);
//# sourceMappingURL=CacheService.js.map