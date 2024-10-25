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
exports.CrcRemarkSettingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crc_remark_setting_entity_1 = require("./entities/crc-remark-setting.entity");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
let CrcRemarkSettingService = class CrcRemarkSettingService {
    constructor(crcRemarkSettingRepository, redis) {
        this.crcRemarkSettingRepository = crcRemarkSettingRepository;
        this.redis = redis;
    }
    async create(createCrcRemarkSettingDto) {
        const crcRemarkSetting = this.crcRemarkSettingRepository.create(createCrcRemarkSettingDto);
        return this.crcRemarkSettingRepository.save(crcRemarkSetting);
    }
    async findAll() {
        return this.crcRemarkSettingRepository.find();
    }
    async findOne(id) {
        return this.crcRemarkSettingRepository.findOneBy({ id });
    }
    async remove(id) {
        await this.crcRemarkSettingRepository.delete(id);
    }
    async update(crcSettingDtos) {
        const updatedEntities = [];
        for (const dto of crcSettingDtos) {
            const crcSetting = await this.crcRemarkSettingRepository.findOne({
                where: { id: dto.id },
            });
            if (crcSetting) {
                await this.crcRemarkSettingRepository.save(dto);
                updatedEntities.push(crcSetting);
            }
        }
        await this.redis.flushall();
        return updatedEntities;
    }
    async findByCodeOrRemarkAllContent(code, remarkAllContent) {
        const query = this.crcRemarkSettingRepository.createQueryBuilder('crc_remark_setting');
        if (code) {
            query.andWhere('crc_remark_setting.code = :code', { code });
        }
        if (remarkAllContent) {
            query.andWhere('crc_remark_setting.remarkAllContent LIKE :remarkAllContent', { remarkAllContent: `%${remarkAllContent}%` });
        }
        return await query.getMany();
    }
};
exports.CrcRemarkSettingService = CrcRemarkSettingService;
exports.CrcRemarkSettingService = CrcRemarkSettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(crc_remark_setting_entity_1.CrcRemarkSettingEntity)),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ioredis_2.default])
], CrcRemarkSettingService);
//# sourceMappingURL=crc-remark-setting.service.js.map