"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuningInfoController = void 0;
const common_1 = require("@nestjs/common");
const runingInfo_service_1 = require("./runingInfo.service");
const runingInfoDtoItems_1 = require("./dto/runingInfoDtoItems");
const moment = require("moment");
let RuningInfoController = class RuningInfoController {
    constructor(runingInfoService) {
        this.runingInfoService = runingInfoService;
    }
    async create(createDto) {
        return this.runingInfoService.create(createDto);
    }
    async deleteMultiple(req) {
        console.log(req.ids);
        const result = await this.runingInfoService.delete(req.ids, req.rootPath);
        return { success: result };
    }
    async update(updateDto) {
        return this.runingInfoService.update(updateDto);
    }
    async getRunningInfoById(id) {
        return this.runingInfoService.getRunningInfoById(Number(id));
    }
    async getPageUpDown(id, step, type) {
        return this.runingInfoService.getUpDownRunnInfo(Number(id), Number(step), type);
    }
    async findAllWithPagingAndFilter(page = 1, pageSize = 10, startDay, endDay, barcodeNo, patientId, patientNm, nrCount, titles, testType, wbcCountOrder) {
        const startDate = startDay ? moment(startDay).toDate() : undefined;
        const endDate = endDay ? moment(endDay).toDate() : undefined;
        let titlesArray;
        if (titles) {
            titlesArray = titles.split(',');
        }
        const result = await this.runingInfoService.findAllWithPagingAndFilter(page, pageSize, startDate, endDate, barcodeNo, patientId, patientNm, nrCount, titlesArray, testType, wbcCountOrder);
        return { data: result.data, total: result.total, page };
    }
};
exports.RuningInfoController = RuningInfoController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [runingInfoDtoItems_1.CreateRuningInfoDto]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "deleteMultiple", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [runingInfoDtoItems_1.UpdateRuningInfoDto]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('detail/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "getRunningInfoById", null);
__decorate([
    (0, common_1.Get)('pageUpDown'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('step')),
    __param(2, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "getPageUpDown", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('startDay')),
    __param(3, (0, common_1.Query)('endDay')),
    __param(4, (0, common_1.Query)('barcodeNo')),
    __param(5, (0, common_1.Query)('patientId')),
    __param(6, (0, common_1.Query)('patientNm')),
    __param(7, (0, common_1.Query)('nrCount')),
    __param(8, (0, common_1.Query)('title')),
    __param(9, (0, common_1.Query)('testType')),
    __param(10, (0, common_1.Query)('wbcCountOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "findAllWithPagingAndFilter", null);
exports.RuningInfoController = RuningInfoController = __decorate([
    (0, common_1.Controller)('runningInfo'),
    __metadata("design:paramtypes", [runingInfo_service_1.RuningInfoService])
], RuningInfoController);
//# sourceMappingURL=runingInfo.controller.js.map