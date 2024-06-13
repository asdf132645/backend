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
exports.ImagesController = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const platform_express_1 = require("@nestjs/platform-express");
const sharp = require("sharp");
const images_service_1 = require("./images.service");
let ImagesController = class ImagesController {
    constructor(imagesService) {
        this.imagesService = imagesService;
    }
    async getImage(folder, imageName, res) {
        if (!folder || !imageName) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).send('Invalid parameters');
        }
        const absoluteImagePath = path.join(folder, imageName);
        try {
            const imageBuffer = await sharp(absoluteImagePath)
                .toFormat('webp')
                .jpeg({ quality: 60 })
                .toBuffer();
            res.setHeader('Content-Type', 'image/webp');
            res.send(imageBuffer);
        }
        catch (error) {
            console.error('Error processing image:', error);
            res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .send('Image processing error');
        }
    }
    getImageRealTime(folder, imageName, res) {
        if (!folder || !imageName) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).send('Invalid parameters');
        }
        const absoluteImagePath = path.join(folder, imageName);
        try {
            fs.accessSync(absoluteImagePath, fs.constants.R_OK);
            const fileStream = fs.createReadStream(absoluteImagePath);
            fileStream.pipe(res);
        }
        catch (error) {
            res
                .status(common_1.HttpStatus.NOT_FOUND)
                .send('File not found or permission issue');
        }
    }
    async getImageWbc(folder, imageName, res) {
        await this.imagesService.getImageWbc(folder, imageName, res);
    }
    async moveImage(sourceFolders, destinationFolders, imageNames, res) {
        const sourceFoldersArray = sourceFolders ? sourceFolders.split(',') : [];
        const destinationFoldersArray = destinationFolders
            ? destinationFolders.split(',')
            : [];
        console.log(imageNames);
        const imageNamesArray = imageNames ? imageNames.split(',') : [];
        if (sourceFoldersArray.length !== destinationFoldersArray.length ||
            sourceFoldersArray.length !== imageNamesArray.length) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: 'Invalid parameters' });
        }
        const moveResults = {
            success: [],
            failed: [],
        };
        console.log(imageNamesArray);
        for (let i = 0; i < imageNamesArray.length; i++) {
            const imageName = imageNamesArray[i];
            const absoluteSourcePath = path.join(sourceFoldersArray[i], imageName);
            const absoluteDestinationPath = path.join(destinationFoldersArray[i], imageName);
            console.log(absoluteSourcePath);
            try {
                fs.accessSync(absoluteSourcePath, fs.constants.R_OK);
                fs.renameSync(absoluteSourcePath, absoluteDestinationPath);
                moveResults.success.push(imageName);
            }
            catch (error) {
                moveResults.failed.push({ imageName, error: error.message });
            }
        }
        return res.status(common_1.HttpStatus.OK).json(moveResults);
    }
    async moveClassImage(sourceFolders, destinationFolders, imageNames, res) {
        const sourceFoldersArray = Array.isArray(sourceFolders)
            ? sourceFolders
            : [];
        const destinationFoldersArray = Array.isArray(destinationFolders)
            ? destinationFolders
            : [];
        const imageNamesArray = Array.isArray(imageNames) ? imageNames : [];
        if (sourceFoldersArray.length !== destinationFoldersArray.length ||
            sourceFoldersArray.length !== imageNamesArray.length) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: 'Invalid parameters' });
        }
        const moveResults = {
            success: [],
            failed: [],
        };
        for (let i = 0; i < imageNamesArray.length; i++) {
            const imageName = imageNamesArray[i];
            const absoluteSourcePath = path.join(sourceFoldersArray[i], imageName);
            const absoluteDestinationPath = path.join(destinationFoldersArray[i], imageName);
            try {
                fs.accessSync(absoluteSourcePath, fs.constants.R_OK);
                fs.renameSync(absoluteSourcePath, absoluteDestinationPath);
                moveResults.success.push(imageName);
            }
            catch (error) {
                moveResults.failed.push({ imageName, error: error.message });
            }
        }
        return res.status(common_1.HttpStatus.OK).json(moveResults);
    }
    async uploadImage(file) {
        const uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        const fileName = `${Date.now()}`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, file.buffer);
        return { imagePath: filePath };
    }
    async cropImage(requestBody, res) {
        try {
            const { startX, startY, endX, endY, originalImagePath, newImagePath } = requestBody;
            await sharp(originalImagePath)
                .extract({
                left: startX,
                top: startY,
                width: endX - startX,
                height: endY - startY,
            })
                .toFile(newImagePath);
            return res.status(200).send(newImagePath);
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    }
};
exports.ImagesController = ImagesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('folder')),
    __param(1, (0, common_1.Query)('imageName')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "getImage", null);
__decorate([
    (0, common_1.Get)('getImageRealTime'),
    __param(0, (0, common_1.Query)('folder')),
    __param(1, (0, common_1.Query)('imageName')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "getImageRealTime", null);
__decorate([
    (0, common_1.Get)('getImageWbc'),
    __param(0, (0, common_1.Query)('folder')),
    __param(1, (0, common_1.Query)('imageName')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "getImageWbc", null);
__decorate([
    (0, common_1.Get)('move'),
    __param(0, (0, common_1.Query)('sourceFolders')),
    __param(1, (0, common_1.Query)('destinationFolders')),
    __param(2, (0, common_1.Query)('imageNames')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "moveImage", null);
__decorate([
    (0, common_1.Post)('moveClassImage'),
    __param(0, (0, common_1.Body)('sourceFolders')),
    __param(1, (0, common_1.Body)('destinationFolders')),
    __param(2, (0, common_1.Body)('fileNames')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "moveClassImage", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('crop-image'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "cropImage", null);
exports.ImagesController = ImagesController = __decorate([
    (0, common_1.Controller)('images'),
    __metadata("design:paramtypes", [images_service_1.ImagesService])
], ImagesController);
//# sourceMappingURL=images.controller.js.map