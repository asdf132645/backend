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
exports.CellImgAnalyzedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cell_entity_1 = require("./entities/cell.entity");
const user_entity_1 = require("../../../user/entities/user.entity");
let CellImgAnalyzedService = class CellImgAnalyzedService {
    constructor(cellImgAnalyzedRepository, userRepository) {
        this.cellImgAnalyzedRepository = cellImgAnalyzedRepository;
        this.userRepository = userRepository;
    }
    async create(dto) {
        const { ...rest } = dto;
        const entity = this.cellImgAnalyzedRepository.create({ ...rest });
        return await this.cellImgAnalyzedRepository.save(entity);
    }
    async find() {
        try {
            const queryBuilder = this.cellImgAnalyzedRepository
                .createQueryBuilder('cellImgAnalyzed');
            return await queryBuilder.getOne();
        }
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    async update(id, dto) {
        const { ...rest } = dto;
        const existingEntity = await this.findById(id);
        if (!existingEntity) {
            throw new common_1.NotFoundException(`id가 ${id}인 세포 이미지 분석을 찾을 수 없습니다.`);
        }
        this.cellImgAnalyzedRepository.merge(existingEntity, { ...rest });
        return await this.cellImgAnalyzedRepository.save(existingEntity);
    }
    async findById(id) {
        const entity = await this.cellImgAnalyzedRepository.findOne({
            where: { id },
        });
        if (!entity) {
            throw new common_1.NotFoundException(`id가 ${id}인 사용자를 찾을 수 없습니다`);
        }
        return entity;
    }
};
exports.CellImgAnalyzedService = CellImgAnalyzedService;
exports.CellImgAnalyzedService = CellImgAnalyzedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cell_entity_1.CellImgAnalyzed)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CellImgAnalyzedService);
//# sourceMappingURL=cell.service.js.map