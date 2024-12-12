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
exports.CrcSaveDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crc_save_data_entity_1 = require("./entities/crc_save_data.entity");
let CrcSaveDataService = class CrcSaveDataService {
    constructor(crcSaveDataRepository) {
        this.crcSaveDataRepository = crcSaveDataRepository;
    }
    async findAll() {
        return this.crcSaveDataRepository.find();
    }
    async findOneBySlotId(slotId) {
        return this.crcSaveDataRepository.findOne({ where: { slotId } });
    }
    async create(data) {
        const newData = this.crcSaveDataRepository.create(data);
        return this.crcSaveDataRepository.save(newData);
    }
    async updateBySlotId(slotId, data) {
        const existingData = await this.findOneBySlotId(slotId);
        if (!existingData) {
            throw new Error(`Data with slotId "${slotId}" not found`);
        }
        const updatedData = this.crcSaveDataRepository.merge(existingData, data);
        return this.crcSaveDataRepository.save(updatedData);
    }
    async deleteBySlotId(slotId) {
        const existingData = await this.findOneBySlotId(slotId);
        if (!existingData) {
            throw new Error(`Data with slotId "${slotId}" not found`);
        }
        await this.crcSaveDataRepository.delete({ slotId });
    }
};
exports.CrcSaveDataService = CrcSaveDataService;
exports.CrcSaveDataService = CrcSaveDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(crc_save_data_entity_1.CrcSaveDataEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CrcSaveDataService);
//# sourceMappingURL=crc_save_data.service.js.map