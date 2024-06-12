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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let LoggerService = class LoggerService extends common_1.Logger {
    constructor() {
        super();
        this.logFileName = 'logs.txt';
        this.logDir = path.join('src', 'logs');
        this.logFilePath = path.join(this.logDir, this.logFileName);
        this.ensureLogDirectoryExists();
        this.deleteLogFileIfOlderThanTwoDays();
    }
    log(message) {
        super.log(message);
        fs.appendFileSync(this.logFilePath, `${new Date().toISOString()} - ${message}\n`);
    }
    error(message, trace) {
        super.error(message, trace);
        fs.appendFileSync(this.logFilePath, `${new Date().toISOString()} - ERROR: ${message}\n${trace}\n`);
    }
    warn(message) {
        super.warn(message);
        fs.appendFileSync(this.logFilePath, `${new Date().toISOString()} - WARNING: ${message}\n`);
    }
    debug(message) {
        super.debug(message);
        fs.appendFileSync(this.logFilePath, `${new Date().toISOString()} - DEBUG: ${message}\n`);
    }
    ensureLogDirectoryExists() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
            console.log('로그 디렉토리가 존재하지 않아서 생성되었습니다.');
        }
    }
    deleteLogFileIfOlderThanTwoDays() {
        try {
            const stats = fs.statSync(this.logFilePath);
            const twoDaysAgo = new Date();
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
            if (stats.birthtime < twoDaysAgo) {
                fs.unlinkSync(this.logFilePath);
                console.log('로그 파일이 2 일 전보다 오래되어 삭제되었습니다.');
            }
        }
        catch (error) {
            console.error('로그 파일을 확인하거나 삭제하는 동안 오류가 발생했습니다:', error.message);
        }
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);
//# sourceMappingURL=logger.service.js.map