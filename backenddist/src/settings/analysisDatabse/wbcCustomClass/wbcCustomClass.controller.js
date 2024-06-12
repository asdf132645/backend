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
exports.WbcCustomClassController = void 0;
const common_1 = require("@nestjs/common");
const wbcCustomClass_service_1 = require("./wbcCustomClass.service");
const wbcCustomDto_1 = require("./dto/wbcCustomDto");
let WbcCustomClassController = class WbcCustomClassController {
    constructor(wbcCustomClassService) {
        this.wbcCustomClassService = wbcCustomClassService;
    }
    create(createDto) {
        return this.wbcCustomClassService.create(createDto);
    }
    update(updateDto) {
        return this.wbcCustomClassService.update(updateDto);
    }
    get() {
        return this.wbcCustomClassService.find();
    }
};
exports.WbcCustomClassController = WbcCustomClassController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wbcCustomDto_1.CreateWbcCustomClassDto]),
    __metadata("design:returntype", void 0)
], WbcCustomClassController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wbcCustomDto_1.UpdateWbcCustomClassDto]),
    __metadata("design:returntype", void 0)
], WbcCustomClassController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WbcCustomClassController.prototype, "get", null);
exports.WbcCustomClassController = WbcCustomClassController = __decorate([
    (0, common_1.Controller)('wbcCustomClass'),
    __metadata("design:paramtypes", [wbcCustomClass_service_1.WbcCustomClassService])
], WbcCustomClassController);
//# sourceMappingURL=wbcCustomClass.controller.js.map