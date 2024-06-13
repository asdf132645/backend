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
exports.RuningInfoEntity = void 0;
const typeorm_1 = require("typeorm");
let RuningInfoEntity = class RuningInfoEntity {
};
exports.RuningInfoEntity = RuningInfoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RuningInfoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], RuningInfoEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "traySlot", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "slotNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "barcodeNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "patientNm", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "birthDay", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "wbcCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "orderDttm", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "testType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], RuningInfoEntity.prototype, "analyzedDttm", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "stateCd", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "tactTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "maxWbcCount", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], RuningInfoEntity.prototype, "lowPowerPath", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], RuningInfoEntity.prototype, "runningPath", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RuningInfoEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "cassetId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "isNormal", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], RuningInfoEntity.prototype, "wbcInfo", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], RuningInfoEntity.prototype, "wbcInfoAfter", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], RuningInfoEntity.prototype, "rbcInfo", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], RuningInfoEntity.prototype, "rbcInfoAfter", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "submitState", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], RuningInfoEntity.prototype, "submitOfDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "signedUserId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "isNsNbIntegration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "wbcMemo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "rbcMemo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "pcIp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "cbcPatientNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "cbcPatientNm", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "cbcSex", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "cbcAge", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "rootPath", void 0);
exports.RuningInfoEntity = RuningInfoEntity = __decorate([
    (0, typeorm_1.Entity)()
], RuningInfoEntity);
//# sourceMappingURL=runingInfo.entity.js.map