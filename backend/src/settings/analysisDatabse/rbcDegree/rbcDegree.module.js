"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbcDegreeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rbcDegree_controller_1 = require("./rbcDegree.controller");
const rbcDegree_service_1 = require("./rbcDegree.service");
const rbcDegree_entity_1 = require("./rbcDegree.entity");
const user_entity_1 = require("../../../user/entities/user.entity");
let RbcDegreeModule = class RbcDegreeModule {
};
exports.RbcDegreeModule = RbcDegreeModule;
exports.RbcDegreeModule = RbcDegreeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rbcDegree_entity_1.RbcDegree, user_entity_1.User])],
        controllers: [rbcDegree_controller_1.RbcDegreeController],
        providers: [rbcDegree_service_1.RbcDegreeService],
    })
], RbcDegreeModule);
//# sourceMappingURL=rbcDegree.module.js.map