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
exports.FoldersController = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
let FoldersController = class FoldersController {
    getFilesInFolder(folderPath, res) {
        if (!folderPath) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).send('폴더 못찾음');
        }
        try {
            const fullPath = path.join(folderPath);
            const stats = fs.statSync(fullPath);
            if (stats.isDirectory()) {
                const files = fs.readdirSync(fullPath);
                res.status(common_1.HttpStatus.OK).json(files);
            }
            else if (stats.isFile()) {
                const fileStream = fs.createReadStream(fullPath);
                fileStream.pipe(res);
            }
            else {
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('잘못된 경로입니다.');
            }
        }
        catch (error) {
            res
                .status(common_1.HttpStatus.NOT_FOUND)
                .send('파일 또는 폴더를 찾을 수 없습니다.');
        }
    }
    getFilesInFolderWhole(folderPath, res) {
        if (!folderPath) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .send('폴더를 찾을 수 없습니다.');
        }
        try {
            const fullPath = path.join(folderPath);
            const stats = fs.statSync(fullPath);
            if (stats.isDirectory()) {
                const files = fs.readdirSync(fullPath);
                res.status(common_1.HttpStatus.OK).json(files);
            }
            else if (stats.isFile()) {
                const fileExtension = path.extname(fullPath).toLowerCase();
                if (['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif', '.bmp'].includes(fileExtension)) {
                    const optimizedStream = sharp(fullPath)
                        .toFormat('webp')
                        .jpeg({ quality: 30 });
                    optimizedStream.pipe(res);
                }
                else {
                    const fileStream = fs.createReadStream(fullPath);
                    fileStream.pipe(res);
                }
            }
            else {
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('잘못된 경로입니다.');
            }
        }
        catch (error) {
            console.error(error);
            res
                .status(common_1.HttpStatus.NOT_FOUND)
                .send('파일 또는 폴더를 찾을 수 없습니다.');
        }
    }
};
exports.FoldersController = FoldersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('folderPath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "getFilesInFolder", null);
__decorate([
    (0, common_1.Get)('getFilesInFolderWhole'),
    __param(0, (0, common_1.Query)('folderPath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "getFilesInFolderWhole", null);
exports.FoldersController = FoldersController = __decorate([
    (0, common_1.Controller)('folders')
], FoldersController);
//# sourceMappingURL=folders.controller.js.map