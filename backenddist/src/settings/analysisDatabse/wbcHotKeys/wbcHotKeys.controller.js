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
exports.WbcHotKeysController = void 0;
const common_1 = require("@nestjs/common");
const wbcHotKeys_service_1 = require("./wbcHotKeys.service");
const wbcHotKeys_dto_1 = require("./dto/wbcHotKeys.dto");
let WbcHotKeysController = class WbcHotKeysController {
    constructor(wbcHotKeysService) {
        this.wbcHotKeysService = wbcHotKeysService;
    }
    async create(createDto) {
        return this.wbcHotKeysService.create(createDto);
    }
    async update(updateDto) {
        return this.wbcHotKeysService.update(updateDto);
    }
    async find() {
        return this.wbcHotKeysService.find();
    }
};
exports.WbcHotKeysController = WbcHotKeysController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wbcHotKeys_dto_1.CreateWbcHotKeysDto]),
    __metadata("design:returntype", Promise)
], WbcHotKeysController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wbcHotKeys_dto_1.CreateWbcHotKeysDto]),
    __metadata("design:returntype", Promise)
], WbcHotKeysController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WbcHotKeysController.prototype, "find", null);
exports.WbcHotKeysController = WbcHotKeysController = __decorate([
    (0, common_1.Controller)('wbcHotKeys'),
    __metadata("design:paramtypes", [wbcHotKeys_service_1.WbcHotKeysService])
], WbcHotKeysController);
//# sourceMappingURL=wbcHotKeys.controller.js.map