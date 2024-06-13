"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hl7Module = void 0;
const common_1 = require("@nestjs/common");
const hl7_controller_1 = require("./hl7.controller");
const hl7_service_1 = require("./hl7.service");
let Hl7Module = class Hl7Module {
};
exports.Hl7Module = Hl7Module;
exports.Hl7Module = Hl7Module = __decorate([
    (0, common_1.Module)({
        controllers: [hl7_controller_1.HL7Controller],
        providers: [hl7_service_1.HL7Service],
    })
], Hl7Module);
//# sourceMappingURL=hl7.module.js.map