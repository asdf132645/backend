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
exports.WbcResponse = exports.WbcInfo = exports.WbcInfoAfter = exports.RbcInfo = exports.ClassInfo = void 0;
const graphql_1 = require("@nestjs/graphql");
let ClassInfo = class ClassInfo {
};
exports.ClassInfo = ClassInfo;
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ClassInfo.prototype, "classId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ClassInfo.prototype, "classNm", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ClassInfo.prototype, "degree", void 0);
exports.ClassInfo = ClassInfo = __decorate([
    (0, graphql_1.ObjectType)()
], ClassInfo);
let RbcInfo = class RbcInfo {
};
exports.RbcInfo = RbcInfo;
__decorate([
    (0, graphql_1.Field)(() => [ClassInfo], { nullable: true }),
    __metadata("design:type", Array)
], RbcInfo.prototype, "classInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RbcInfo.prototype, "categoryId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RbcInfo.prototype, "categoryNm", void 0);
exports.RbcInfo = RbcInfo = __decorate([
    (0, graphql_1.ObjectType)()
], RbcInfo);
let WbcInfoAfter = class WbcInfoAfter {
};
exports.WbcInfoAfter = WbcInfoAfter;
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], WbcInfoAfter.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], WbcInfoAfter.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], WbcInfoAfter.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], WbcInfoAfter.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], WbcInfoAfter.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], WbcInfoAfter.prototype, "percent", void 0);
exports.WbcInfoAfter = WbcInfoAfter = __decorate([
    (0, graphql_1.ObjectType)()
], WbcInfoAfter);
let WbcInfo = class WbcInfo {
};
exports.WbcInfo = WbcInfo;
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], WbcInfo.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], WbcInfo.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], WbcInfo.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], WbcInfo.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], WbcInfo.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], WbcInfo.prototype, "percent", void 0);
exports.WbcInfo = WbcInfo = __decorate([
    (0, graphql_1.ObjectType)()
], WbcInfo);
let WbcResponse = class WbcResponse {
};
exports.WbcResponse = WbcResponse;
__decorate([
    (0, graphql_1.Field)(() => [WbcInfo], { nullable: true }),
    __metadata("design:type", Array)
], WbcResponse.prototype, "wbcInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], WbcResponse.prototype, "totalCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], WbcResponse.prototype, "maxWbcCount", void 0);
exports.WbcResponse = WbcResponse = __decorate([
    (0, graphql_1.ObjectType)()
], WbcResponse);
//# sourceMappingURL=class-info.js.map