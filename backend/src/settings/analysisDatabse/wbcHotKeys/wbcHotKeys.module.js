"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WbcHotKeysModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wbcHotKeys_entity_1 = require("./wbcHotKeys.entity");
const wbcHotKeys_service_1 = require("./wbcHotKeys.service");
const wbcHotKeys_controller_1 = require("./wbcHotKeys.controller");
let WbcHotKeysModule = class WbcHotKeysModule {
};
exports.WbcHotKeysModule = WbcHotKeysModule;
exports.WbcHotKeysModule = WbcHotKeysModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([wbcHotKeys_entity_1.WbcHotKeys])],
        providers: [wbcHotKeys_service_1.WbcHotKeysService],
        exports: [wbcHotKeys_service_1.WbcHotKeysService],
        controllers: [wbcHotKeys_controller_1.WbcHotKeysController],
    })
], WbcHotKeysModule);
//# sourceMappingURL=wbcHotKeys.module.js.map