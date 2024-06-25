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
exports.ListCodeRbcDto = exports.CreateLisCodeRbcDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateLisCodeRbcDto {
}
exports.CreateLisCodeRbcDto = CreateLisCodeRbcDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ListCodeRbcDto),
    __metadata("design:type", Array)
], CreateLisCodeRbcDto.prototype, "lisCodeItems", void 0);
class ListCodeRbcDto {
}
exports.ListCodeRbcDto = ListCodeRbcDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ListCodeRbcDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListCodeRbcDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListCodeRbcDto.prototype, "categoryNm", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListCodeRbcDto.prototype, "classId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListCodeRbcDto.prototype, "fullNm", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListCodeRbcDto.prototype, "key", void 0);
//# sourceMappingURL=lisCodeRbcDto.js.map