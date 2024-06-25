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
exports.RbcDegreeController = void 0;
const common_1 = require("@nestjs/common");
const rbcDegree_service_1 = require("./rbcDegree.service");
let RbcDegreeController = class RbcDegreeController {
    constructor(rbcDegreeService) {
        this.rbcDegreeService = rbcDegreeService;
    }
    async create(rbcDegreeDto) {
        try {
            await this.rbcDegreeService.create(rbcDegreeDto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    async update(updateRbcDegreeDto) {
        return this.rbcDegreeService.update(updateRbcDegreeDto);
    }
    async findOne() {
        return this.rbcDegreeService.find();
    }
    async remove() {
        return this.rbcDegreeService.remove();
    }
};
exports.RbcDegreeController = RbcDegreeController;
__decorate([
    (0, common_1.Post)('rbcDegreeAdd'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RbcDegreeController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RbcDegreeController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RbcDegreeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RbcDegreeController.prototype, "remove", null);
exports.RbcDegreeController = RbcDegreeController = __decorate([
    (0, common_1.Controller)('rbcDegree'),
    __metadata("design:paramtypes", [rbcDegree_service_1.RbcDegreeService])
], RbcDegreeController);
//# sourceMappingURL=rbcDegree.controller.js.map