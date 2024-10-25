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
exports.CrcRecommendationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
const crc_reco_entity_1 = require("./entities/crc_reco.entity");
let CrcRecommendationService = class CrcRecommendationService {
    constructor(crcRecommendationEntityRepository, redis) {
        this.crcRecommendationEntityRepository = crcRecommendationEntityRepository;
        this.redis = redis;
    }
    async create(createCrcRecommendationSettingDto) {
        const crcRecommendationSetting = this.crcRecommendationEntityRepository.create(createCrcRecommendationSettingDto);
        return this.crcRecommendationEntityRepository.save(crcRecommendationSetting);
    }
    async findAll() {
        return this.crcRecommendationEntityRepository.find();
    }
    async findOne(id) {
        return this.crcRecommendationEntityRepository.findOneBy({ id });
    }
    async remove(id) {
        await this.crcRecommendationEntityRepository.delete(id);
    }
    async update(crcRecommendationSettingDto) {
        const updatedEntities = [];
        for (const dto of crcRecommendationSettingDto) {
            const crcSetting = await this.crcRecommendationEntityRepository.findOne({
                where: { id: dto.id },
            });
            if (crcSetting) {
                await this.crcRecommendationEntityRepository.save(dto);
                updatedEntities.push(crcSetting);
            }
        }
        return updatedEntities;
    }
    async findByCodeOrRecommendationAllContent(code, remarkAllContent) {
        const query = this.crcRecommendationEntityRepository.createQueryBuilder('crc_recommendation_setting');
        if (code) {
            query.andWhere('crc_recommendation_setting.code = :code', { code });
        }
        if (remarkAllContent) {
            query.andWhere('crc_recommendation_setting.remarkAllContent LIKE :remarkAllContent', { remarkAllContent: `%${remarkAllContent}%` });
        }
        return await query.getMany();
    }
};
exports.CrcRecommendationService = CrcRecommendationService;
exports.CrcRecommendationService = CrcRecommendationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(crc_reco_entity_1.CrcRecommendationEntity)),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ioredis_2.default])
], CrcRecommendationService);
//# sourceMappingURL=crc_reco.service.js.map