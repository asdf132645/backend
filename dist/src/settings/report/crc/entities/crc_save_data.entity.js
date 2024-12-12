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
exports.CrcSaveDataEntity = void 0;
const typeorm_1 = require("typeorm");
let CrcSaveDataEntity = class CrcSaveDataEntity {
};
exports.CrcSaveDataEntity = CrcSaveDataEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CrcSaveDataEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], CrcSaveDataEntity.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], CrcSaveDataEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], CrcSaveDataEntity.prototype, "crcDataArr", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], CrcSaveDataEntity.prototype, "crcArr", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], CrcSaveDataEntity.prototype, "remarkList", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], CrcSaveDataEntity.prototype, "commentList", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], CrcSaveDataEntity.prototype, "recoList", void 0);
exports.CrcSaveDataEntity = CrcSaveDataEntity = __decorate([
    (0, typeorm_1.Entity)('crc_save_data')
], CrcSaveDataEntity);
//# sourceMappingURL=crc_save_data.entity.js.map