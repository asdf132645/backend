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
exports.CrcOptionController = void 0;
const common_1 = require("@nestjs/common");
const crc_option_service_1 = require("./crc-option.service");
let CrcOptionController = class CrcOptionController {
    constructor(crcOptionService) {
        this.crcOptionService = crcOptionService;
    }
    async findAll() {
        return this.crcOptionService.findAll();
    }
    async findOne(id) {
        return this.crcOptionService.findOne(id);
    }
    async create(crcOptionData) {
        return this.crcOptionService.create(crcOptionData);
    }
    async update(crcOptionData) {
        return this.crcOptionService.update(crcOptionData);
    }
    async delete(id) {
        return this.crcOptionService.delete(id);
    }
};
exports.CrcOptionController = CrcOptionController;
__decorate([
    (0, common_1.Get)('crcOptionGet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CrcOptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CrcOptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('crcOptionCreate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrcOptionController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('crcOptionUpdate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrcOptionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CrcOptionController.prototype, "delete", null);
exports.CrcOptionController = CrcOptionController = __decorate([
    (0, common_1.Controller)('crc-option'),
    __metadata("design:paramtypes", [crc_option_service_1.CrcOptionService])
], CrcOptionController);
//# sourceMappingURL=crc-option.controller.js.map