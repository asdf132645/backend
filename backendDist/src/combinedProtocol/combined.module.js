"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombinedModule = void 0;
const common_1 = require("@nestjs/common");
const combined_service_1 = require("./combined.service");
const logger_service_1 = require("../logger.service");
const runingInfo_module_1 = require("../runingInfo/runingInfo.module");
let CombinedModule = class CombinedModule {
};
exports.CombinedModule = CombinedModule;
exports.CombinedModule = CombinedModule = __decorate([
    (0, common_1.Module)({
        imports: [runingInfo_module_1.RuningInfoModule],
        providers: [combined_service_1.CombinedService, logger_service_1.LoggerService],
        exports: [combined_service_1.CombinedService, logger_service_1.LoggerService],
    })
], CombinedModule);
//# sourceMappingURL=combined.module.js.map