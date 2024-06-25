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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("./file.service");
const path = require("path");
const fs = require("fs");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async readFile(path, filename) {
        const fullPath = `${path}/${filename}`;
        const result = await this.fileService.readFile(fullPath);
        if (result.success) {
            return { success: true, data: result.data, code: common_1.HttpStatus.OK };
        }
        else {
            return {
                success: false,
                message: result.message,
                code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    createDirectory(directoryPath) {
        if (!directoryPath) {
            return 'Path parameter is required';
        }
        const fullPath = path.resolve(directoryPath);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }
        return `Directory created at ${directoryPath} (if it did not already exist)`;
    }
    async createFile(body) {
        const { path, filename, content } = body;
        try {
            fs.writeFileSync(`${path}/${filename}`, content);
            return { success: true };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Get)('read'),
    __param(0, (0, common_1.Query)('path')),
    __param(1, (0, common_1.Query)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "readFile", null);
__decorate([
    (0, common_1.Get)('create-directory'),
    __param(0, (0, common_1.Query)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "createDirectory", null);
__decorate([
    (0, common_1.Post)('createFile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "createFile", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
//# sourceMappingURL=file.controller.js.map