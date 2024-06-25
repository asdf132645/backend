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
exports.CbcCodeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cbcCode_entity_1 = require("./cbcCode.entity");
let CbcCodeService = class CbcCodeService {
    constructor(cbcCodeEntityRepository) {
        this.cbcCodeEntityRepository = cbcCodeEntityRepository;
    }
    async create(createDto) {
        const { cbcCodeItems } = createDto;
        const createdItems = [];
        for (const item of cbcCodeItems) {
            const cbcCodeEntity = this.cbcCodeEntityRepository.create({ ...item });
            const createdItem = await this.cbcCodeEntityRepository.save(cbcCodeEntity);
            createdItems.push(createdItem);
        }
        return createdItems[0];
    }
    async update(updateDto) {
        const { cbcCodeItems } = updateDto;
        const updatedItems = [];
        for (const item of cbcCodeItems) {
            const updatedItem = await this.updateItem(item);
            updatedItems.push(updatedItem);
        }
        return updatedItems;
    }
    async updateItem(item) {
        const existingBfHotKeys = await this.cbcCodeEntityRepository.findOne({
            where: { id: item.id },
        });
        if (existingBfHotKeys) {
            await this.cbcCodeEntityRepository.update(existingBfHotKeys.id, item);
            return await this.cbcCodeEntityRepository.findOne({
                where: { id: item.id },
            });
        }
        return null;
    }
    async find() {
        return await this.cbcCodeEntityRepository.find();
    }
};
exports.CbcCodeService = CbcCodeService;
exports.CbcCodeService = CbcCodeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cbcCode_entity_1.CbcCodeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CbcCodeService);
//# sourceMappingURL=cbcCode.service.js.map