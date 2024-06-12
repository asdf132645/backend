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
exports.MinCountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const minCount_entity_1 = require("./minCount.entity");
let MinCountService = class MinCountService {
    constructor(minCountEntityRepository) {
        this.minCountEntityRepository = minCountEntityRepository;
    }
    async create(createDto) {
        const { minCountItems } = createDto;
        const createdItems = [];
        for (const item of minCountItems) {
            const imagePrintEntity = this.minCountEntityRepository.create({ ...item });
            const createdItem = await this.minCountEntityRepository.save(imagePrintEntity);
            createdItems.push(createdItem);
        }
        return createdItems[0];
    }
    async update(updateDto) {
        const { minCountItems } = updateDto;
        const updatedItems = [];
        for (const item of minCountItems) {
            const updatedItem = await this.updateItem(item);
            updatedItems.push(updatedItem);
        }
        return updatedItems;
    }
    async updateItem(item) {
        const existingMinCount = await this.minCountEntityRepository.findOne({
            where: { id: item.id },
        });
        if (existingMinCount) {
            await this.minCountEntityRepository.update(existingMinCount.id, item);
            return await this.minCountEntityRepository.findOne({
                where: { id: item.id },
            });
        }
        return null;
    }
    async find() {
        return await this.minCountEntityRepository.find();
    }
};
exports.MinCountService = MinCountService;
exports.MinCountService = MinCountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(minCount_entity_1.MinCountEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MinCountService);
//# sourceMappingURL=minCount.service.js.map