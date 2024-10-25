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
exports.CrcRemarkSettingController = void 0;
const common_1 = require("@nestjs/common");
const crc_remark_setting_service_1 = require("./crc-remark-setting.service");
const crc_remark_setting_dto_1 = require("./dto/crc-remark-setting.dto");
let CrcRemarkSettingController = class CrcRemarkSettingController {
    constructor(crcRemarkSettingService) {
        this.crcRemarkSettingService = crcRemarkSettingService;
    }
    create(createCrcRemarkSettingDto) {
        return this.crcRemarkSettingService.create(createCrcRemarkSettingDto);
    }
    findAll() {
        return this.crcRemarkSettingService.findAll();
    }
    find(code, remarkAllContent) {
        {
            return this.crcRemarkSettingService.findByCodeOrRemarkAllContent(code, remarkAllContent);
        }
    }
    findOne(id) {
        return this.crcRemarkSettingService.findOne(+id);
    }
    remove(id) {
        return this.crcRemarkSettingService.remove(+id);
    }
    update(updateCrcSettingDtos) {
        return this.crcRemarkSettingService.update(updateCrcSettingDtos);
    }
};
exports.CrcRemarkSettingController = CrcRemarkSettingController;
__decorate([
    (0, common_1.Post)('crcRemarkCreate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crc_remark_setting_dto_1.CreateCrcRemarkSettingDto]),
    __metadata("design:returntype", void 0)
], CrcRemarkSettingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('crcRemarkFindAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CrcRemarkSettingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('crcRemark'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('remarkAllContent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CrcRemarkSettingController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrcRemarkSettingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)('crcRemarkRemove'),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrcRemarkSettingController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)('crcRemarkUpdate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], CrcRemarkSettingController.prototype, "update", null);
exports.CrcRemarkSettingController = CrcRemarkSettingController = __decorate([
    (0, common_1.Controller)('crc-remark-setting'),
    __metadata("design:paramtypes", [crc_remark_setting_service_1.CrcRemarkSettingService])
], CrcRemarkSettingController);
//# sourceMappingURL=crc-remark-setting.controller.js.map