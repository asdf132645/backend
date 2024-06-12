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
exports.UpdateRuningInfoDto = exports.CreateRuningInfoDto = exports.OrderDto = exports.ProcessInfoDto = exports.ClassInfoDto = exports.RbcInfoDto = exports.WbcInfoDto = exports.RuningInfoDtoItems = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class RuningInfoDtoItems {
}
exports.RuningInfoDtoItems = RuningInfoDtoItems;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], RuningInfoDtoItems.prototype, "id", void 0);
class WbcInfoDto {
}
exports.WbcInfoDto = WbcInfoDto;
class RbcInfoDto {
}
exports.RbcInfoDto = RbcInfoDto;
class ClassInfoDto {
}
exports.ClassInfoDto = ClassInfoDto;
class ProcessInfoDto {
}
exports.ProcessInfoDto = ProcessInfoDto;
class OrderDto {
}
exports.OrderDto = OrderDto;
class CreateRuningInfoDto {
}
exports.CreateRuningInfoDto = CreateRuningInfoDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateRuningInfoDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RuningInfoDtoItems),
    __metadata("design:type", RuningInfoDtoItems)
], CreateRuningInfoDto.prototype, "runingInfoDtoItems", void 0);
class UpdateRuningInfoDto {
}
exports.UpdateRuningInfoDto = UpdateRuningInfoDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateRuningInfoDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RuningInfoDtoItems),
    __metadata("design:type", Array)
], UpdateRuningInfoDto.prototype, "runingInfoDtoItems", void 0);
//# sourceMappingURL=runingInfoDtoItems.js.map