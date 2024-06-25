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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellImgAnalyzed = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let CellImgAnalyzed = class CellImgAnalyzed {
};
exports.CellImgAnalyzed = CellImgAnalyzed;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ example: 1, description: '세포 이미지 분석 ID' }),
    __metadata("design:type", Number)
], CellImgAnalyzed.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: '01', description: '분석 유형' }),
    __metadata("design:type", String)
], CellImgAnalyzed.prototype, "analysisType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: '100', description: '세포 분석 횟수' }),
    __metadata("design:type", String)
], CellImgAnalyzed.prototype, "diffCellAnalyzingCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: '100', description: 'PBS 분석 유형 2' }),
    __metadata("design:type", String)
], CellImgAnalyzed.prototype, "pbsCellAnalyzingCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: '100', description: 'BF 분석 유형' }),
    __metadata("design:type", String)
], CellImgAnalyzed.prototype, "bfCellAnalyzingCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: '0', description: 'WBC 위치 여백' }),
    __metadata("design:type", String)
], CellImgAnalyzed.prototype, "wbcPositionMargin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: '0', description: 'RBC 위치 여백' }),
    __metadata("design:type", String)
], CellImgAnalyzed.prototype, "rbcPositionMargin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: '0', description: 'PLT 위치 여백' }),
    __metadata("design:type", String)
], CellImgAnalyzed.prototype, "pltPositionMargin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: '1', description: '스티치 카운트' }),
    __metadata("design:type", String)
], CellImgAnalyzed.prototype, "stitchCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: '', description: 'IA 루트 경로' }),
    __metadata("design:type", String)
], CellImgAnalyzed.prototype, "iaRootPath", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: false, description: 'NS/NB 통합 여부' }),
    __metadata("design:type", Boolean)
], CellImgAnalyzed.prototype, "isNsNbIntegration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: false, description: '알람 여부' }),
    __metadata("design:type", Boolean)
], CellImgAnalyzed.prototype, "isAlarm", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: '0', description: '알람 카운트' }),
    __metadata("design:type", String)
], CellImgAnalyzed.prototype, "alarmCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: false, description: '페이지 유지 여부' }),
    __metadata("design:type", Boolean)
], CellImgAnalyzed.prototype, "keepPage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: '', description: '백업 경로' }),
    __metadata("design:type", String)
], CellImgAnalyzed.prototype, "backupPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, swagger_1.ApiProperty)({ example: '2024-02-20', description: '백업 시작 날짜' }),
    __metadata("design:type", Date)
], CellImgAnalyzed.prototype, "backupStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, swagger_1.ApiProperty)({ example: '2024-02-20', description: '백업 종료 날짜' }),
    __metadata("design:type", Date)
], CellImgAnalyzed.prototype, "backupEndDate", void 0);
exports.CellImgAnalyzed = CellImgAnalyzed = __decorate([
    (0, typeorm_1.Entity)('cell_img_analyzed_setting')
], CellImgAnalyzed);
//# sourceMappingURL=cell.entity.js.map