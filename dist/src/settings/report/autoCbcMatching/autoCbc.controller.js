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
exports.AutoCbcController = void 0;
const common_1 = require("@nestjs/common");
const autoCbc_service_1 = require("./autoCbc.service");
const autoCbcDto_1 = require("./dto/autoCbcDto");
let AutoCbcController = class AutoCbcController {
    constructor(autoCbcService) {
        this.autoCbcService = autoCbcService;
    }
    findAll() {
        return this.autoCbcService.findAll();
    }
    create(autoCbcData) {
        return this.autoCbcService.create(autoCbcData);
    }
    update(autoCbcData) {
        return this.autoCbcService.update(autoCbcData.id, autoCbcData);
    }
    delete(id) {
        return this.autoCbcService.delete(id);
    }
    async updateAll(autoCbcDataArray) {
        return this.autoCbcService.updateAll(autoCbcDataArray);
    }
};
exports.AutoCbcController = AutoCbcController;
__decorate([
    (0, common_1.Get)('findAutoCbc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutoCbcController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('autoCbcCreate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [autoCbcDto_1.autoCbcItems]),
    __metadata("design:returntype", Promise)
], AutoCbcController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('autoCbcPut'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [autoCbcDto_1.autoCbcItems]),
    __metadata("design:returntype", Promise)
], AutoCbcController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('autoCbcDel'),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AutoCbcController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('autoCbcUpdateAll'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AutoCbcController.prototype, "updateAll", null);
exports.AutoCbcController = AutoCbcController = __decorate([
    (0, common_1.Controller)('autoCbc'),
    __metadata("design:paramtypes", [autoCbc_service_1.AutoCbcService])
], AutoCbcController);
//# sourceMappingURL=autoCbc.controller.js.map