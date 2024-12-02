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
exports.CrcSaveDataController = void 0;
const common_1 = require("@nestjs/common");
const crc_save_data_service_1 = require("./crc_save_data.service");
let CrcSaveDataController = class CrcSaveDataController {
    constructor(crcSaveDataService) {
        this.crcSaveDataService = crcSaveDataService;
    }
    async findAll() {
        return this.crcSaveDataService.findAll();
    }
    async findOne(slotId) {
        const data = await this.crcSaveDataService.findOneBySlotId(slotId);
        return data ? data : [];
    }
    async create(data) {
        return this.crcSaveDataService.create(data);
    }
    async update(data) {
        return this.crcSaveDataService.updateBySlotId(data.slotId, data);
    }
    async delete(data) {
        return this.crcSaveDataService.deleteBySlotId(data.slotId);
    }
};
exports.CrcSaveDataController = CrcSaveDataController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CrcSaveDataController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('saveDataSlotIdGet/:slotId'),
    __param(0, (0, common_1.Param)('slotId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CrcSaveDataController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('saveDataCreate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrcSaveDataController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('saveDataPutData'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrcSaveDataController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('saveDataDelete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrcSaveDataController.prototype, "delete", null);
exports.CrcSaveDataController = CrcSaveDataController = __decorate([
    (0, common_1.Controller)('crc-save-data'),
    __metadata("design:paramtypes", [crc_save_data_service_1.CrcSaveDataService])
], CrcSaveDataController);
//# sourceMappingURL=crc_save_data.controller.js.map