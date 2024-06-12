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
exports.BackupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const runingInfo_entity_1 = require("../runingInfo/runingInfo.entity");
const child_process_1 = require("child_process");
const fs = require("fs-extra");
const path = require("path");
let BackupService = class BackupService {
    constructor(runningInfoRepository) {
        this.runningInfoRepository = runningInfoRepository;
    }
    formatDateToString(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}${month}${day}000000000`;
    }
    async backupData(backupDto) {
        const { startDate, endDate, backupPath, sourceFolderPath } = backupDto;
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const formattedStartDate = this.formatDateToString(startDateObj);
        const formattedEndDate = this.formatDateToString(endDateObj);
        if (!(await fs.pathExists(backupPath))) {
            await fs.ensureDir(backupPath);
        }
        const dateFolder = path.join(backupPath, `${startDate}_${endDate}`);
        if (!(await fs.pathExists(dateFolder))) {
            await fs.ensureDir(dateFolder);
        }
        const dataToBackup = await this.runningInfoRepository.find({
            where: {
                createDate: (0, typeorm_2.Between)(formattedStartDate, formattedEndDate),
            },
        });
        const slotIds = dataToBackup.map((item) => item.slotId);
        for (const slotId of slotIds) {
            const sourcePath = path.join(sourceFolderPath, slotId);
            const targetFolderPath = path.join(dateFolder, slotId);
            if (!(await fs.pathExists(targetFolderPath))) {
                await fs.ensureDir(targetFolderPath);
            }
            await fs
                .move(sourcePath, targetFolderPath, { overwrite: true })
                .catch((err) => {
                console.error(`Error moving ${sourcePath} to ${targetFolderPath}: ${err}`);
            });
        }
        await Promise.all(dataToBackup.map(async (item) => {
            item.rootPath = dateFolder;
            await this.runningInfoRepository.save(item);
        }));
        const backupFileName = `backup-${startDate}-${endDate}.sql`;
        const sqlBackupFilePath = path.join(dateFolder, backupFileName);
        const dumpCommand = `mysqldump --user=root --password=uimd5191! --host=127.0.0.1 pb_db runing_info_entity --where="createDate BETWEEN '${startDate}' AND '${endDate}'" > ${sqlBackupFilePath}`;
        (0, child_process_1.exec)(dumpCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing dump command: ${error.message}`);
                return error.message;
            }
            if (stderr) {
                console.error(`mysqldump stderr: ${stderr}`);
                return stderr;
            }
            console.log(`Database backup saved to ${sqlBackupFilePath}`);
        });
    }
};
exports.BackupService = BackupService;
exports.BackupService = BackupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(runingInfo_entity_1.RuningInfoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BackupService);
//# sourceMappingURL=backup.service.js.map