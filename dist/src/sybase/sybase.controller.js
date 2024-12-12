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
exports.SybaseController = void 0;
const common_1 = require("@nestjs/common");
const sybase_proxy_service_1 = require("./sybase.proxy.service");
let SybaseController = class SybaseController {
    constructor(sybaseProxyService) {
        this.sybaseProxyService = sybaseProxyService;
    }
    async getCbcResults(smp_no) {
        return await this.sybaseProxyService.getCbcResults(smp_no);
    }
    async saveUimdResult(data) {
        return await this.sybaseProxyService.saveUimdResult(data);
    }
    async cbcImgGet(smp_no) {
        return await this.sybaseProxyService.cbcImgGet(smp_no);
    }
    async saveComment(data) {
        return await this.sybaseProxyService.saveComment(data);
    }
};
exports.SybaseController = SybaseController;
__decorate([
    (0, common_1.Get)('cbc-results'),
    __param(0, (0, common_1.Query)('smp_no')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SybaseController.prototype, "getCbcResults", null);
__decorate([
    (0, common_1.Post)('save-uimd-result'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SybaseController.prototype, "saveUimdResult", null);
__decorate([
    (0, common_1.Get)('cbcImgGet'),
    __param(0, (0, common_1.Query)('smp_no')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SybaseController.prototype, "cbcImgGet", null);
__decorate([
    (0, common_1.Post)('saveComment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SybaseController.prototype, "saveComment", null);
exports.SybaseController = SybaseController = __decorate([
    (0, common_1.Controller)('sybase'),
    __metadata("design:paramtypes", [sybase_proxy_service_1.SybaseProxyService])
], SybaseController);
//# sourceMappingURL=sybase.controller.js.map