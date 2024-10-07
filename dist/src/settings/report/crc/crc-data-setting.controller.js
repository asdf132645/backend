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
exports.CrcDataSettingController = void 0;
const common_1 = require("@nestjs/common");
const crc_data_setting_service_1 = require("./crc-data-setting.service");
const crc_data_setting_dto_1 = require("./dto/crc-data-setting.dto");
let CrcDataSettingController = class CrcDataSettingController {
    constructor(crcDataSettingService) {
        this.crcDataSettingService = crcDataSettingService;
    }
    create(createCrcDataSettingDto) {
        return this.crcDataSettingService.create(createCrcDataSettingDto);
    }
    findAll() {
        return this.crcDataSettingService.findAll();
    }
    findOne(id) {
        return this.crcDataSettingService.findOne(+id);
    }
    remove(id) {
        return this.crcDataSettingService.remove(+id);
    }
};
exports.CrcDataSettingController = CrcDataSettingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crc_data_setting_dto_1.CreateCrcDataSettingDto]),
    __metadata("design:returntype", void 0)
], CrcDataSettingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CrcDataSettingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrcDataSettingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrcDataSettingController.prototype, "remove", null);
exports.CrcDataSettingController = CrcDataSettingController = __decorate([
    (0, common_1.Controller)('crc-data-setting'),
    __metadata("design:paramtypes", [crc_data_setting_service_1.CrcDataSettingService])
], CrcDataSettingController);
//# sourceMappingURL=crc-data-setting.controller.js.map