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
const category_entity_1 = require("./category.entity");
const typeorm_2 = require("typeorm");
let RbcDegreeService = class RbcDegreeService {
    constructor(rbcDegreeRepository, categoryRepository) {
        this.rbcDegreeRepository = rbcDegreeRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(rbcDegreeDto) {
        const rbcDegree = this.rbcDegreeRepository.create(rbcDegreeDto);
        await this.rbcDegreeRepository.save(rbcDegree);
        const categories = rbcDegreeDto.categories.map((categoryDto) => {
            const category = this.categoryRepository.create({
                ...categoryDto,
                rbcDegree: rbcDegree,
            });
            return category;
        });
        await this.categoryRepository.save(categories);
    }
    async update(updateRbcDegreeDto) {
        const existingDegree = await this.rbcDegreeRepository.find({ relations: ['categories'] });
        updateRbcDegreeDto.forEach((updatedCategory) => {
            const existingCategory = existingDegree[0].categories.find((category) => category.category_id === updatedCategory.category_id &&
                category.class_id === updatedCategory.class_id &&
                category.class_nm === updatedCategory.class_nm);
            if (existingCategory) {
                existingCategory.degree1 = updatedCategory.degree1;
                existingCategory.degree2 = updatedCategory.degree2;
                existingCategory.degree3 = updatedCategory.degree3;
            }
        });
        await this.rbcDegreeRepository.save(existingDegree);
        await this.categoryRepository.save(existingDegree[0].categories);
        return existingDegree[0];
    }
    async find() {
        const degree = await this.rbcDegreeRepository.find({
            relations: ['categories'],
        });
        if (!degree) {
            return degree[0];
        }
        return degree[0];
    }
    async findAll() {
        return this.rbcDegreeRepository.find({ relations: ['categories'] });
    }
    async remove() {
        const degree = await this.rbcDegreeRepository.find({
            relations: ['categories'],
        });
        await this.rbcDegreeRepository.remove(degree);
    }
};
exports.RbcDegreeService = RbcDegreeService;
exports.RbcDegreeService = RbcDegreeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rbcDegree_entity_1.RbcDegree)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RbcDegreeService);
//# sourceMappingURL=rbcDegree.service.js.map