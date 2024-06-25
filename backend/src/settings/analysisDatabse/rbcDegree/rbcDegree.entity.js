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
exports.RbcDegree = void 0;
const typeorm_1 = require("typeorm");
let RbcDegree = class RbcDegree {
};
exports.RbcDegree = RbcDegree;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RbcDegree.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RbcDegree.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RbcDegree.prototype, "categoryNm", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RbcDegree.prototype, "classId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RbcDegree.prototype, "classNm", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RbcDegree.prototype, "degree1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RbcDegree.prototype, "degree2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RbcDegree.prototype, "degree3", void 0);
exports.RbcDegree = RbcDegree = __decorate([
    (0, typeorm_1.Entity)('rbc_degree_setting')
], RbcDegree);
//# sourceMappingURL=rbcDegree.entity.js.map