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
exports.CrcSettingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crc_setting_entity_1 = require("./entities/crc-setting.entity");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
let CrcSettingService = class CrcSettingService {
    constructor(crcSettingRepository, redis) {
        this.crcSettingRepository = crcSettingRepository;
        this.redis = redis;
    }
    async create(createCrcSettingDtos) {
        const crcSettings = this.crcSettingRepository.create(createCrcSettingDtos);
        return this.crcSettingRepository.save(crcSettings);
    }
    async update(crcSettingDtos) {
        const updatedEntities = [];
        for (const dto of crcSettingDtos) {
            const crcSetting = await this.crcSettingRepository.findOne({
                where: { id: dto.id },
            });
            if (crcSetting) {
                await this.crcSettingRepository.save(dto);
                updatedEntities.push(crcSetting);
            }
        }
        await this.redis.flushall();
        return updatedEntities;
    }
    async findAll() {
        return this.crcSettingRepository.find();
    }
    async findOne(id) {
        return this.crcSettingRepository.findOneBy({ id });
    }
    async remove(id) {
        console.log(id);
        await this.redis.flushall();
        await this.crcSettingRepository.delete(id);
    }
};
exports.CrcSettingService = CrcSettingService;
exports.CrcSettingService = CrcSettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(crc_setting_entity_1.CrcSettingEntity)),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ioredis_2.default])
], CrcSettingService);
//# sourceMappingURL=crc-setting.service.js.map