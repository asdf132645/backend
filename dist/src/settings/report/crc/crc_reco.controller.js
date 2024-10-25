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
exports.CrcRecommendationSettingController = void 0;
const common_1 = require("@nestjs/common");
const crc_reco_service_1 = require("./crc_reco.service");
const crc_reco_dto_1 = require("./dto/crc_reco.dto");
let CrcRecommendationSettingController = class CrcRecommendationSettingController {
    constructor(crcRecommendationSettingService) {
        this.crcRecommendationSettingService = crcRecommendationSettingService;
    }
    create(createCrcRecommendationDto) {
        return this.crcRecommendationSettingService.create(createCrcRecommendationDto);
    }
    findAll() {
        return this.crcRecommendationSettingService.findAll();
    }
    find(code, RecommendationAllContent) {
        {
            return this.crcRecommendationSettingService.findByCodeOrRecommendationAllContent(code, RecommendationAllContent);
        }
    }
    findOne(id) {
        return this.crcRecommendationSettingService.findOne(+id);
    }
    remove(id) {
        return this.crcRecommendationSettingService.remove(+id);
    }
    update(updateCrcSettingDtos) {
        return this.crcRecommendationSettingService.update(updateCrcSettingDtos);
    }
};
exports.CrcRecommendationSettingController = CrcRecommendationSettingController;
__decorate([
    (0, common_1.Post)('crcRecommendationCreate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crc_reco_dto_1.CreateCrcRecoDto]),
    __metadata("design:returntype", void 0)
], CrcRecommendationSettingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('crcRecommendationFindAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CrcRecommendationSettingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('crcRSearch'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('RecommendationAllContent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CrcRecommendationSettingController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrcRecommendationSettingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)('crcRecommendationRemove'),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrcRecommendationSettingController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)('crcRecommendationUpdate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], CrcRecommendationSettingController.prototype, "update", null);
exports.CrcRecommendationSettingController = CrcRecommendationSettingController = __decorate([
    (0, common_1.Controller)('crc-recommendation-setting'),
    __metadata("design:paramtypes", [crc_reco_service_1.CrcRecommendationService])
], CrcRecommendationSettingController);
//# sourceMappingURL=crc_reco.controller.js.map