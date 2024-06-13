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
exports.LisCodeRbcService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lisCodeRbc_entity_1 = require("./lisCodeRbc.entity");
let LisCodeRbcService = class LisCodeRbcService {
    constructor(lisCodeRbcEntityRepository) {
        this.lisCodeRbcEntityRepository = lisCodeRbcEntityRepository;
    }
    async create(createDto) {
        const { lisCodeItems } = createDto;
        const createdItems = [];
        for (const item of lisCodeItems) {
            const lisCodeEntity = this.lisCodeRbcEntityRepository.create({ ...item });
            const createdItem = await this.lisCodeRbcEntityRepository.save(lisCodeEntity);
            createdItems.push(createdItem);
        }
        return createdItems[0];
    }
    async update(updateDto) {
        const { lisCodeItems } = updateDto;
        const updatedItems = [];
        for (const item of lisCodeItems) {
            const updatedItem = await this.updateItem(item);
            updatedItems.push(updatedItem);
        }
        return updatedItems;
    }
    async updateItem(item) {
        const existingLisCode = await this.lisCodeRbcEntityRepository.findOne({
            where: { id: item.id },
        });
        if (existingLisCode) {
            await this.lisCodeRbcEntityRepository.update(existingLisCode.id, item);
            return await this.lisCodeRbcEntityRepository.findOne({
                where: { id: item.id },
            });
        }
        return null;
    }
    async find() {
        return await this.lisCodeRbcEntityRepository.find();
    }
};
exports.LisCodeRbcService = LisCodeRbcService;
exports.LisCodeRbcService = LisCodeRbcService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lisCodeRbc_entity_1.LisCodeRbcEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LisCodeRbcService);
//# sourceMappingURL=lisCodeRbc.service.js.map