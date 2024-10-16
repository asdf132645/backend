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
exports.CrcOptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crc_option_entity_1 = require("./entities/crc-option.entity");
let CrcOptionService = class CrcOptionService {
    constructor(crcOptionRepository) {
        this.crcOptionRepository = crcOptionRepository;
    }
    async findAll() {
        return this.crcOptionRepository.find();
    }
    async findOne(id) {
        return this.crcOptionRepository.findOneBy({ id });
    }
    async create(crcOptionData) {
        const newCrcOption = this.crcOptionRepository.create(crcOptionData);
        return this.crcOptionRepository.save(newCrcOption);
    }
    async update(crcOptionData) {
        const { id, ...updateData } = crcOptionData;
        await this.crcOptionRepository.update(id, updateData);
        return this.findOne(id);
    }
    async delete(id) {
        await this.crcOptionRepository.delete(id);
    }
};
exports.CrcOptionService = CrcOptionService;
exports.CrcOptionService = CrcOptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(crc_option_entity_1.CrcOption)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CrcOptionService);
//# sourceMappingURL=crc-option.service.js.map