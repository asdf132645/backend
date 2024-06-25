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
exports.WbcHotKeysService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wbcHotKeys_entity_1 = require("./wbcHotKeys.entity");
let WbcHotKeysService = class WbcHotKeysService {
    constructor(wbcHotKeysRepository) {
        this.wbcHotKeysRepository = wbcHotKeysRepository;
    }
    async create(createDto) {
        const { wbcHotKeysItems } = createDto;
        const createdItems = [];
        for (const item of wbcHotKeysItems) {
            const wbcHotKeys = this.wbcHotKeysRepository.create({ ...item });
            const createdItem = await this.wbcHotKeysRepository.save(wbcHotKeys);
            createdItems.push(createdItem);
        }
        return createdItems[0];
    }
    async update(updateDto) {
        const { wbcHotKeysItems } = updateDto;
        const updatedItems = [];
        for (const item of wbcHotKeysItems) {
            const updatedItem = await this.updateItem(item);
            updatedItems.push(updatedItem);
        }
        return updatedItems;
    }
    async updateItem(item) {
        const existingWbcHotKeys = await this.wbcHotKeysRepository.findOne({
            where: { id: item.id },
        });
        if (existingWbcHotKeys) {
            await this.wbcHotKeysRepository.update(existingWbcHotKeys.id, item);
            return await this.wbcHotKeysRepository.findOne({
                where: { id: item.id },
            });
        }
        return null;
    }
    async find() {
        return await this.wbcHotKeysRepository.find();
    }
};
exports.WbcHotKeysService = WbcHotKeysService;
exports.WbcHotKeysService = WbcHotKeysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wbcHotKeys_entity_1.WbcHotKeys)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WbcHotKeysService);
//# sourceMappingURL=wbcHotKeys.service.js.map