"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WbcCustomClassModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wbcCustomClass_entity_1 = require("./wbcCustomClass.entity");
const wbcCustomClass_service_1 = require("./wbcCustomClass.service");
const wbcCustomClass_controller_1 = require("./wbcCustomClass.controller");
let WbcCustomClassModule = class WbcCustomClassModule {
};
exports.WbcCustomClassModule = WbcCustomClassModule;
exports.WbcCustomClassModule = WbcCustomClassModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([wbcCustomClass_entity_1.WbcCustomClass])],
        providers: [wbcCustomClass_service_1.WbcCustomClassService],
        controllers: [wbcCustomClass_controller_1.WbcCustomClassController],
    })
], WbcCustomClassModule);
//# sourceMappingURL=wbcCustomClass.module.js.map