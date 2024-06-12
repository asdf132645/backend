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
exports.HL7Controller = void 0;
const common_1 = require("@nestjs/common");
const hl7_service_1 = require("./hl7.service");
let HL7Controller = class HL7Controller {
    constructor(hl7Service) {
        this.hl7Service = hl7Service;
    }
    async parseHL7Message(data) {
        return this.hl7Service.parseHL7Message(data);
    }
    createHL7Message(requestBody) {
        const hl7Message = this.hl7Service.generateHL7Message(requestBody.sendingApp, requestBody.sendingFacility, requestBody.receivingApp, requestBody.receivingFacility, requestBody.dateTime, requestBody.messageType, requestBody.messageControlId, requestBody.processingId, requestBody.hl7VersionId, requestBody.wbcInfo, requestBody.result);
        return hl7Message;
    }
    async sendHl7Message(body) {
        const { filepath, msg } = body;
        try {
            await this.hl7Service.sendHl7Message(filepath, msg);
            return { message: 'HL7 message sent successfully' };
        }
        catch (error) {
            return { error: error };
        }
    }
};
exports.HL7Controller = HL7Controller;
__decorate([
    (0, common_1.Post)('parse'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Buffer]),
    __metadata("design:returntype", Promise)
], HL7Controller.prototype, "parseHL7Message", null);
__decorate([
    (0, common_1.Post)('message'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], HL7Controller.prototype, "createHL7Message", null);
__decorate([
    (0, common_1.Post)('hl7Create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HL7Controller.prototype, "sendHl7Message", null);
exports.HL7Controller = HL7Controller = __decorate([
    (0, common_1.Controller)('hl7'),
    __metadata("design:paramtypes", [hl7_service_1.HL7Service])
], HL7Controller);
//# sourceMappingURL=hl7.controller.js.map