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
exports.CrcDataSettingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crc_data_setting_entity_1 = require("./entities/crc-data-setting.entity");
let CrcDataSettingService = class CrcDataSettingService {
    constructor(crcDataSettingRepository) {
        this.crcDataSettingRepository = crcDataSettingRepository;
    }
    async create(createCrcDataSettingDto) {
        const crcDataSetting = this.crcDataSettingRepository.create(createCrcDataSettingDto);
        return this.crcDataSettingRepository.save(crcDataSetting);
    }
    async findAll() {
        return this.crcDataSettingRepository.find();
    }
    async findOne(id) {
        return this.crcDataSettingRepository.findOneBy({ id });
    }
    async remove(id) {
        await this.crcDataSettingRepository.delete(id);
    }
};
exports.CrcDataSettingService = CrcDataSettingService;
exports.CrcDataSettingService = CrcDataSettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(crc_data_setting_entity_1.CrcDataSettingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CrcDataSettingService);
//# sourceMappingURL=crc-data-setting.service.js.map