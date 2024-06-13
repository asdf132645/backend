"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassOrderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const classOrder_service_1 = require("./classOrder.service");
const classOrder_controller_1 = require("./classOrder.controller");
const classOrder_1 = require("./classOrder");
let ClassOrderModule = class ClassOrderModule {
};
exports.ClassOrderModule = ClassOrderModule;
exports.ClassOrderModule = ClassOrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([classOrder_1.ClassOrder]),
        ],
        controllers: [classOrder_controller_1.ClassOrderController],
        providers: [classOrder_service_1.ClassOrderService],
    })
], ClassOrderModule);
//# sourceMappingURL=classOrder.module.js.map