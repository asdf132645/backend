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
exports.CellImgAnalyzedController = void 0;
const common_1 = require("@nestjs/common");
const create_cellImg_dto_1 = require("./dto/create-cellImg.dto");
const cell_service_1 = require("./cell.service");
const swagger_1 = require("@nestjs/swagger");
let CellImgAnalyzedController = class CellImgAnalyzedController {
    constructor(cellImgAnalyzedService) {
        this.cellImgAnalyzedService = cellImgAnalyzedService;
    }
    async create(dto) {
        try {
            return await this.cellImgAnalyzedService.create(dto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    async update(id, dto) {
        try {
            return await this.cellImgAnalyzedService.update(id, dto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    async findByUserId() {
        try {
            return await this.cellImgAnalyzedService.find();
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
};
exports.CellImgAnalyzedController = CellImgAnalyzedController;
__decorate([
    (0, common_1.Post)('cellImgAdd'),
    (0, swagger_1.ApiOperation)({
        summary: '새로운 세포 이미지 분석 생성',
        description: '새로운 세포 이미지 분석을 생성합니다.',
    }),
    (0, swagger_1.ApiBody)({ type: create_cellImg_dto_1.CellImgAnalyzedDto, description: '세포 이미지 분석 데이터' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '성공적으로 세포 이미지 분석이 생성되었습니다.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cellImg_dto_1.CellImgAnalyzedDto]),
    __metadata("design:returntype", Promise)
], CellImgAnalyzedController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '기존 세포 이미지 분석 갱신',
        description: '기존의 세포 이미지 분석을 ID로 갱신합니다.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '세포 이미지 분석 ID' }),
    (0, swagger_1.ApiBody)({ type: create_cellImg_dto_1.CellImgAnalyzedDto, description: '세포 이미지 분석 데이터' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공적으로 세포 이미지 분석이 갱신되었습니다.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_cellImg_dto_1.CellImgAnalyzedDto]),
    __metadata("design:returntype", Promise)
], CellImgAnalyzedController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '세포 이미지 분석 조회',
        description: '세포 이미지 분석을 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공적으로 세포 이미지 분석이 조회되었습니다.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CellImgAnalyzedController.prototype, "findByUserId", null);
exports.CellImgAnalyzedController = CellImgAnalyzedController = __decorate([
    (0, common_1.Controller)('cellImgAnalyzed'),
    (0, swagger_1.ApiTags)('Cell Image Analyzed'),
    __metadata("design:paramtypes", [cell_service_1.CellImgAnalyzedService])
], CellImgAnalyzedController);
//# sourceMappingURL=cell.controller.js.map