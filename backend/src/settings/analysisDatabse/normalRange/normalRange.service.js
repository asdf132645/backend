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
exports.NormalRangeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const normalRange_entity_1 = require("./normalRange.entity");
let NormalRangeService = class NormalRangeService {
    constructor(normalRangeRepository) {
        this.normalRangeRepository = normalRangeRepository;
    }
    async create(createDto) {
        const { normalRangeItems } = createDto;
        const createdItems = [];
        for (const item of normalRangeItems) {
            const normalRange = this.normalRangeRepository.create({ ...item });
            const createdItem = await this.normalRangeRepository.save(normalRange);
            createdItems.push(createdItem);
        }
        return createdItems[0];
    }
    async update(updateDto) {
        const { normalRangeItems } = updateDto;
        const updatedItems = [];
        for (const item of normalRangeItems) {
            const updatedItem = await this.updateItem(item);
            updatedItems.push(updatedItem);
        }
        return updatedItems;
    }
    async updateItem(item) {
        const existingNormalRange = await this.normalRangeRepository.findOne({
            where: { id: item.id },
        });
        if (existingNormalRange) {
            await this.normalRangeRepository.update(existingNormalRange.id, item);
            return await this.normalRangeRepository.findOne({
                where: { id: item.id },
            });
        }
        return null;
    }
    async find() {
        return await this.normalRangeRepository.find();
    }
};
exports.NormalRangeService = NormalRangeService;
exports.NormalRangeService = NormalRangeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(normalRange_entity_1.NormalRange)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NormalRangeService);
//# sourceMappingURL=normalRange.service.js.map