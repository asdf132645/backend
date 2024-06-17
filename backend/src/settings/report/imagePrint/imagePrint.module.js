"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagePrintModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const imagePrint_entity_1 = require("./imagePrint.entity");
const imagePrint_service_1 = require("./imagePrint.service");
const imagePrint_controller_1 = require("./imagePrint.controller");
let ImagePrintModule = class ImagePrintModule {
};
exports.ImagePrintModule = ImagePrintModule;
exports.ImagePrintModule = ImagePrintModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([imagePrint_entity_1.ImagePrintEntity])],
        providers: [imagePrint_service_1.ImagePrintService],
        exports: [imagePrint_service_1.ImagePrintService],
        controllers: [imagePrint_controller_1.ImagePrintController],
    })
], ImagePrintModule);
//# sourceMappingURL=imagePrint.module.js.map