"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonReaderService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs-extra");
let JsonReaderService = class JsonReaderService {
    async readJsonFile(fullPath) {
        try {
            console.log(fullPath);
            const fileContent = await fs.readJson(fullPath);
            return fileContent;
        }
        catch (error) {
            return 'not file';
        }
    }
    async createJson(file, filePath) {
        try {
            const { buffer } = file;
            const jsonData = JSON.parse(buffer.toString());
            fs.writeFileSync(filePath, JSON.stringify(jsonData));
            return {
                success: true,
                message: 'JSON 데이터가 성공적으로 생성되었습니다.',
                filePath: filePath,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'JSON 데이터 생성 중 오류가 발생했습니다.',
                error,
            };
        }
    }
};
exports.JsonReaderService = JsonReaderService;
exports.JsonReaderService = JsonReaderService = __decorate([
    (0, common_1.Injectable)()
], JsonReaderService);
//# sourceMappingURL=jsonReader.service.js.map