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
exports.CrcDataSettingEntity = void 0;
const typeorm_1 = require("typeorm");
let CrcDataSettingEntity = class CrcDataSettingEntity {
};
exports.CrcDataSettingEntity = CrcDataSettingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CrcDataSettingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], CrcDataSettingEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], CrcDataSettingEntity.prototype, "crcContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], CrcDataSettingEntity.prototype, "crcRemark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], CrcDataSettingEntity.prototype, "crcComment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], CrcDataSettingEntity.prototype, "crcRecommendation", void 0);
exports.CrcDataSettingEntity = CrcDataSettingEntity = __decorate([
    (0, typeorm_1.Entity)('crc_data_setting')
], CrcDataSettingEntity);
//# sourceMappingURL=crc-data-setting.entity.js.map