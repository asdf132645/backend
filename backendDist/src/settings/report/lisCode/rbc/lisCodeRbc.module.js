"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LisCodeRbcModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lisCodeRbc_entity_1 = require("./lisCodeRbc.entity");
const lisCodeRbc_service_1 = require("./lisCodeRbc.service");
const lisCodeRbc_controller_1 = require("./lisCodeRbc.controller");
let LisCodeRbcModule = class LisCodeRbcModule {
};
exports.LisCodeRbcModule = LisCodeRbcModule;
exports.LisCodeRbcModule = LisCodeRbcModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([lisCodeRbc_entity_1.LisCodeRbcEntity])],
        providers: [lisCodeRbc_service_1.LisCodeRbcService],
        exports: [lisCodeRbc_service_1.LisCodeRbcService],
        controllers: [lisCodeRbc_controller_1.LisCodeController],
    })
], LisCodeRbcModule);
//# sourceMappingURL=lisCodeRbc.module.js.map