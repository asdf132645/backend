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
exports.CrcSettingController = void 0;
const common_1 = require("@nestjs/common");
const crc_setting_service_1 = require("./crc-setting.service");
let CrcSettingController = class CrcSettingController {
    constructor(crcSettingService) {
        this.crcSettingService = crcSettingService;
    }
    create(createCrcSettingDto) {
        return this.crcSettingService.create(createCrcSettingDto);
    }
    findAll() {
        return this.crcSettingService.findAll();
    }
    update(updateCrcSettingDtos) {
        return this.crcSettingService.update(updateCrcSettingDtos);
    }
    findOne(id) {
        return this.crcSettingService.findOne(+id);
    }
    remove(id) {
        return this.crcSettingService.remove(+id);
    }
};
exports.CrcSettingController = CrcSettingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], CrcSettingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('crc-get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CrcSettingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)('crc-put'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], CrcSettingController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrcSettingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)('crcDel'),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrcSettingController.prototype, "remove", null);
exports.CrcSettingController = CrcSettingController = __decorate([
    (0, common_1.Controller)('crc-setting'),
    __metadata("design:paramtypes", [crc_setting_service_1.CrcSettingService])
], CrcSettingController);
//# sourceMappingURL=crc-setting.controller.js.map