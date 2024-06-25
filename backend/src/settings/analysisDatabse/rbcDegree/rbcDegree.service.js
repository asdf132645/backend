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
exports.RbcDegreeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rbcDegree_entity_1 = require("./rbcDegree.entity");
const typeorm_2 = require("typeorm");
let RbcDegreeService = class RbcDegreeService {
    constructor(rbcDegreeRepository) {
        this.rbcDegreeRepository = rbcDegreeRepository;
    }
    async create(rbcDegreeDto) {
        const categories = rbcDegreeDto.map((categoryDto) => {
            const category = this.rbcDegreeRepository.create({ ...categoryDto });
            return category;
        });
        await this.rbcDegreeRepository.save(categories);
    }
    async update(updateRbcDegreeDto) {
        const updatedItems = [];
        for (const item of updateRbcDegreeDto) {
            const updatedItem = await this.updateItem(item);
            if (updatedItem) {
                updatedItems.push(updatedItem);
            }
        }
        return updatedItems;
    }
    async updateItem(item) {
        const existingRbcDegree = await this.rbcDegreeRepository.findOne({
            where: {
                categoryId: item.categoryId,
                classId: item.classId,
                classNm: item.classNm,
            },
        });
        if (existingRbcDegree) {
            await this.rbcDegreeRepository.update(existingRbcDegree.id, item);
            return await this.rbcDegreeRepository.findOne({
                where: {
                    categoryId: item.categoryId,
                    classId: item.classId,
                    classNm: item.classNm,
                },
            });
        }
        return null;
    }
    async find() {
        return await this.rbcDegreeRepository.find();
    }
    async remove() {
        const degree = await this.rbcDegreeRepository.find();
        await this.rbcDegreeRepository.remove(degree);
    }
};
exports.RbcDegreeService = RbcDegreeService;
exports.RbcDegreeService = RbcDegreeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rbcDegree_entity_1.RbcDegree)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RbcDegreeService);
//# sourceMappingURL=rbcDegree.service.js.map