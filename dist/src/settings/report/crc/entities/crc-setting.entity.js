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
exports.CrcSettingEntity = void 0;
const typeorm_1 = require("typeorm");
let CrcSettingEntity = class CrcSettingEntity {
};
exports.CrcSettingEntity = CrcSettingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CrcSettingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CrcSettingEntity.prototype, "crcTitle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CrcSettingEntity.prototype, "crcType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CrcSettingEntity.prototype, "crcPercentText", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CrcSettingEntity.prototype, "morphologyType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CrcSettingEntity.prototype, "crcContent", void 0);
exports.CrcSettingEntity = CrcSettingEntity = __decorate([
    (0, typeorm_1.Entity)('crc_setting')
], CrcSettingEntity);
//# sourceMappingURL=crc-setting.entity.js.map