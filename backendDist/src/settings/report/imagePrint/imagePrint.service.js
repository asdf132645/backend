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
exports.ImagePrintService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const imagePrint_entity_1 = require("./imagePrint.entity");
let ImagePrintService = class ImagePrintService {
    constructor(imagePrintEntityRepository) {
        this.imagePrintEntityRepository = imagePrintEntityRepository;
    }
    async create(createDto) {
        const { imagePrintItems } = createDto;
        const createdItems = [];
        for (const item of imagePrintItems) {
            const imagePrintEntity = this.imagePrintEntityRepository.create({ ...item });
            const createdItem = await this.imagePrintEntityRepository.save(imagePrintEntity);
            createdItems.push(createdItem);
        }
        return createdItems[0];
    }
    async update(updateDto) {
        const { imagePrintItems } = updateDto;
        const updatedItems = [];
        for (const item of imagePrintItems) {
            const updatedItem = await this.updateItem(item);
            updatedItems.push(updatedItem);
        }
        return updatedItems;
    }
    async updateItem(item) {
        const existingBfHotKeys = await this.imagePrintEntityRepository.findOne({
            where: { id: item.id },
        });
        if (existingBfHotKeys) {
            await this.imagePrintEntityRepository.update(existingBfHotKeys.id, item);
            return await this.imagePrintEntityRepository.findOne({
                where: { id: item.id },
            });
        }
        return null;
    }
    async find() {
        return await this.imagePrintEntityRepository.find();
    }
};
exports.ImagePrintService = ImagePrintService;
exports.ImagePrintService = ImagePrintService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(imagePrint_entity_1.ImagePrintEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ImagePrintService);
//# sourceMappingURL=imagePrint.service.js.map