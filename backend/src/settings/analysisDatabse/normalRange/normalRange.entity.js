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
exports.NormalRange = void 0;
const typeorm_1 = require("typeorm");
let NormalRange = class NormalRange {
};
exports.NormalRange = NormalRange;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NormalRange.prototype, "num", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NormalRange.prototype, "classId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", String)
], NormalRange.prototype, "min", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", String)
], NormalRange.prototype, "max", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NormalRange.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NormalRange.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NormalRange.prototype, "name", void 0);
exports.NormalRange = NormalRange = __decorate([
    (0, typeorm_1.Entity)()
], NormalRange);
//# sourceMappingURL=normalRange.entity.js.map