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
exports.WbcHotKeys = void 0;
const typeorm_1 = require("typeorm");
let WbcHotKeys = class WbcHotKeys {
};
exports.WbcHotKeys = WbcHotKeys;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WbcHotKeys.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], WbcHotKeys.prototype, "abbreviation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WbcHotKeys.prototype, "fullNm", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], WbcHotKeys.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WbcHotKeys.prototype, "orderIdx", void 0);
exports.WbcHotKeys = WbcHotKeys = __decorate([
    (0, typeorm_1.Entity)('wbc_hot_keys_setting')
], WbcHotKeys);
//# sourceMappingURL=wbcHotKeys.entity.js.map