"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BfHotKeysModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bfHotKeys_entity_1 = require("./bfHotKeys.entity");
const bfHotKeys_service_1 = require("./bfHotKeys.service");
const bfHotKeys_controller_1 = require("./bfHotKeys.controller");
let BfHotKeysModule = class BfHotKeysModule {
};
exports.BfHotKeysModule = BfHotKeysModule;
exports.BfHotKeysModule = BfHotKeysModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bfHotKeys_entity_1.BfHotKeys])],
        providers: [bfHotKeys_service_1.BfHotKeysService],
        exports: [bfHotKeys_service_1.BfHotKeysService],
        controllers: [bfHotKeys_controller_1.BfHotKeysController],
    })
], BfHotKeysModule);
//# sourceMappingURL=bfHotKeys.module.js.map