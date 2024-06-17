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
exports.WbcRunCountController = void 0;
const common_1 = require("@nestjs/common");
const wbcRunCount_service_1 = require("./wbcRunCount.service");
const wbcRunCountDto_1 = require("./dto/wbcRunCountDto");
let WbcRunCountController = class WbcRunCountController {
    constructor(wbcCountSetService) {
        this.wbcCountSetService = wbcCountSetService;
    }
    async create(createDto) {
        return this.wbcCountSetService.create(createDto);
    }
    async update(updateDto) {
        return this.wbcCountSetService.update(updateDto);
    }
    async find() {
        return this.wbcCountSetService.find();
    }
};
exports.WbcRunCountController = WbcRunCountController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wbcRunCountDto_1.CreateWbcRunCountDto]),
    __metadata("design:returntype", Promise)
], WbcRunCountController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wbcRunCountDto_1.CreateWbcRunCountDto]),
    __metadata("design:returntype", Promise)
], WbcRunCountController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WbcRunCountController.prototype, "find", null);
exports.WbcRunCountController = WbcRunCountController = __decorate([
    (0, common_1.Controller)('runCount'),
    __metadata("design:paramtypes", [wbcRunCount_service_1.WbcCountSetService])
], WbcRunCountController);
//# sourceMappingURL=wbcRunCount.controller.js.map