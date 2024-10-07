"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrcModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crc_setting_service_1 = require("./crc-setting.service");
const crc_data_setting_service_1 = require("./crc-data-setting.service");
const crc_remark_setting_service_1 = require("./crc-remark-setting.service");
const crc_setting_controller_1 = require("./crc-setting.controller");
const crc_data_setting_controller_1 = require("./crc-data-setting.controller");
const crc_remark_setting_controller_1 = require("./crc-remark-setting.controller");
const crc_setting_entity_1 = require("./entities/crc-setting.entity");
const crc_data_setting_entity_1 = require("./entities/crc-data-setting.entity");
const crc_remark_setting_entity_1 = require("./entities/crc-remark-setting.entity");
let CrcModule = class CrcModule {
};
exports.CrcModule = CrcModule;
exports.CrcModule = CrcModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                crc_setting_entity_1.CrcSettingEntity,
                crc_data_setting_entity_1.CrcDataSettingEntity,
                crc_remark_setting_entity_1.CrcRemarkSettingEntity,
            ]),
        ],
        controllers: [
            crc_setting_controller_1.CrcSettingController,
            crc_data_setting_controller_1.CrcDataSettingController,
            crc_remark_setting_controller_1.CrcRemarkSettingController,
        ],
        providers: [
            crc_setting_service_1.CrcSettingService,
            crc_data_setting_service_1.CrcDataSettingService,
            crc_remark_setting_service_1.CrcRemarkSettingService,
        ],
    })
], CrcModule);
//# sourceMappingURL=crc.module.js.map