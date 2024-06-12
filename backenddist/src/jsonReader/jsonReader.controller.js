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
exports.JsonReaderController = void 0;
const common_1 = require("@nestjs/common");
const jsonReader_service_1 = require("./jsonReader.service");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
const pako = require("pako");
let JsonReaderController = class JsonReaderController {
    constructor(jsonReaderService) {
        this.jsonReaderService = jsonReaderService;
    }
    async getJsonFile(fullPath) {
        return this.jsonReaderService.readJsonFile(fullPath);
    }
    async uploadFile(file, filePath) {
        try {
            const savePath = `${filePath}`;
            const inflatedData = pako.inflate(file.buffer, { to: 'string' });
            fs.writeFileSync(savePath, inflatedData);
            return {
                message: 'File uploaded and saved successfully.',
                filePath: savePath,
            };
        }
        catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to upload and save file.');
        }
    }
};
exports.JsonReaderController = JsonReaderController;
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)('fullPath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JsonReaderController.prototype, "getJsonFile", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('filePath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JsonReaderController.prototype, "uploadFile", null);
exports.JsonReaderController = JsonReaderController = __decorate([
    (0, common_1.Controller)('jsonReader'),
    __metadata("design:paramtypes", [jsonReader_service_1.JsonReaderService])
], JsonReaderController);
//# sourceMappingURL=jsonReader.controller.js.map