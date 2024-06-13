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
exports.RuningInfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const runingInfo_entity_1 = require("./runingInfo.entity");
const fs = require("fs");
const path = require("path");
let RuningInfoService = class RuningInfoService {
    constructor(runingInfoEntityRepository) {
        this.runingInfoEntityRepository = runingInfoEntityRepository;
    }
    async create(createDto) {
        const { userId, runingInfoDtoItems } = createDto;
        const existingEntity = await this.runingInfoEntityRepository.findOne({
            where: {
                userId: userId,
                slotId: runingInfoDtoItems.slotId,
            },
        });
        if (existingEntity) {
            console.log('동일 슬롯아이디 존재 저장 x');
            return null;
        }
        const entity = this.runingInfoEntityRepository.create({
            userId,
            ...runingInfoDtoItems,
        });
        return await this.runingInfoEntityRepository.save(entity);
    }
    async update(updateDto) {
        const { runingInfoDtoItems } = updateDto;
        const updatedItems = [];
        for (const item of runingInfoDtoItems) {
            const existingEntity = await this.runingInfoEntityRepository.findOne({
                where: { id: item.id },
            });
            if (existingEntity) {
                existingEntity.slotNo = item.slotNo;
                existingEntity.barcodeNo = item.barcodeNo;
                existingEntity.patientId = item.patientId;
                existingEntity.patientNm = item.patientNm;
                existingEntity.gender = item.gender;
                existingEntity.birthDay = item.birthDay;
                existingEntity.wbcCount = item.wbcCount;
                existingEntity.slotId = item.slotId;
                existingEntity.orderDttm = item.orderDttm;
                existingEntity.testType = item.testType;
                existingEntity.cbcPatientNo = item.cbcPatientNo;
                existingEntity.cbcPatientNm = item.cbcPatientNm;
                existingEntity.cbcSex = item.cbcSex;
                existingEntity.cbcAge = item.cbcAge;
                existingEntity.stateCd = item.stateCd;
                existingEntity.tactTime = item.tactTime;
                existingEntity.maxWbcCount = item.maxWbcCount;
                existingEntity.lowPowerPath = item.lowPowerPath;
                existingEntity.runningPath = item.runningPath;
                existingEntity.cassetId = item.cassetId;
                existingEntity.isNormal = item.isNormal;
                existingEntity.wbcMemo = item.wbcMemo;
                existingEntity.rbcMemo = item.rbcMemo;
                existingEntity.state = item.state;
                existingEntity.pcIp = item.pcIp;
                existingEntity.rbcInfoAfter = item.rbcInfoAfter;
                existingEntity.wbcInfoAfter = item.wbcInfoAfter;
                existingEntity.submitState = item.submitState;
                existingEntity.submitOfDate = item.submitOfDate;
                existingEntity.signedUserId = item.signedUserId;
                existingEntity.rootPath = item.rootPath;
                await this.runingInfoEntityRepository.save(existingEntity);
                updatedItems.push(existingEntity);
            }
        }
        return updatedItems;
    }
    async delete(ids, rootPaths) {
        try {
            console.log(ids);
            const result = await this.runingInfoEntityRepository.delete({
                id: (0, typeorm_2.In)(ids),
            });
            if (result.affected > 0) {
                for (const rootPath of rootPaths) {
                    try {
                        fs.rmdirSync(rootPath, { recursive: true });
                        console.log(`Folder at ${rootPath} has been deleted successfully`);
                    }
                    catch (error) {
                        console.error(`Failed to delete folder at ${rootPath}:`, error);
                    }
                }
            }
            return result.affected > 0;
        }
        catch (error) {
            console.error('Error while deleting entities:', error);
            return false;
        }
    }
    deleteFolderRecursive(folderPath) {
        if (fs.existsSync(folderPath)) {
            fs.readdirSync(folderPath).forEach((file) => {
                const curPath = path.join(folderPath, file);
                if (fs.lstatSync(curPath).isDirectory()) {
                    this.deleteFolderRecursive(curPath);
                }
                else {
                    fs.unlinkSync(curPath);
                }
            });
        }
    }
    async findAllWithPagingAndFilter(page, pageSize, startDay, endDay, barcodeNo, patientId, patientNm, nrCount, titles, testType, wbcCountOrder) {
        const queryBuilder = this.runingInfoEntityRepository.createQueryBuilder('runInfo');
        const startFormatted = startDay
            ? `${startDay.getFullYear()}${(startDay.getMonth() + 1).toString().padStart(2, '0')}${startDay.getDate().toString().padStart(2, '0')}000000000`
            : undefined;
        const endFormatted = endDay
            ? `${endDay.getFullYear()}${(endDay.getMonth() + 1).toString().padStart(2, '0')}${endDay.getDate().toString().padStart(2, '0')}235959999`
            : undefined;
        if (startFormatted || endFormatted) {
            queryBuilder.andWhere(startFormatted && endFormatted
                ? 'runInfo.createDate BETWEEN :startDay AND :endDay'
                : startFormatted
                    ? 'runInfo.createDate >= :startDay'
                    : 'runInfo.createDate <= :endDay', {
                startDay: startFormatted,
                endDay: endFormatted,
            });
        }
        queryBuilder.orderBy('runInfo.createDate', 'DESC');
        if (barcodeNo) {
            queryBuilder.andWhere('runInfo.barcodeNo = :barcodeNo', { barcodeNo });
        }
        if (patientId) {
            queryBuilder.andWhere('runInfo.patientId = :patientId', { patientId });
        }
        if (patientNm) {
            queryBuilder.andWhere('runInfo.patientNm LIKE :patientNm', {
                patientNm: `%${patientNm}%`,
            });
        }
        if (testType) {
            queryBuilder.andWhere('runInfo.testType = :testType', { testType });
        }
        if (nrCount !== '0') {
            queryBuilder.andWhere('runInfo.wbcCount LIKE :nrCount', {
                nrCount: `%{"title": "NR", "count": "${nrCount}"}%`,
            });
        }
        if (titles && titles.length > 0) {
            titles.forEach((title, index) => {
                queryBuilder.andWhere(`runInfo.wbcCount LIKE :title${index}`, {
                    [`title${index}`]: `%{"title": "${title}"%`,
                });
            });
        }
        let [data, total] = await queryBuilder.getManyAndCount();
        if (wbcCountOrder) {
            data.sort((a, b) => {
                const aCount = Number(a.wbcCount);
                const bCount = Number(b.wbcCount);
                return wbcCountOrder.toUpperCase() === 'ASC'
                    ? aCount - bCount
                    : bCount - aCount;
            });
        }
        if (pageSize && page) {
            data = data.slice((page - 1) * pageSize, page * pageSize);
        }
        return { data, total };
    }
    async clearPcIpAndSetStateFalse(pcIp) {
        try {
            console.log(pcIp);
            const entityWithPcIp = await this.runingInfoEntityRepository.findOne({
                where: { pcIp },
            });
            if (!entityWithPcIp) {
                console.error(`Entity with PC IP ${pcIp} not found`);
                return;
            }
            entityWithPcIp.pcIp = '';
            entityWithPcIp.state = false;
            await this.runingInfoEntityRepository.save(entityWithPcIp);
        }
        catch (error) {
            console.error('Error while clearing PC IP and setting state to false:', error);
        }
    }
    async getRunningInfoById(id) {
        const entity = await this.runingInfoEntityRepository.findOne({
            where: { id },
        });
        return entity || null;
    }
    async getUpDownRunnInfo(id, step, type) {
        const currentEntity = await this.runingInfoEntityRepository.findOne({
            where: { id },
        });
        if (!currentEntity) {
            return null;
        }
        let newEntity = null;
        if (type === 'up') {
            newEntity = await this.runingInfoEntityRepository
                .createQueryBuilder('entity')
                .where('entity.id > :id', { id })
                .orderBy('entity.id', 'ASC')
                .offset(step - 1)
                .limit(1)
                .getOne();
        }
        else if (type === 'down') {
            newEntity = await this.runingInfoEntityRepository
                .createQueryBuilder('entity')
                .where('entity.id < :id', { id })
                .orderBy('entity.id', 'DESC')
                .offset(step - 1)
                .limit(1)
                .getOne();
        }
        return newEntity || null;
    }
};
exports.RuningInfoService = RuningInfoService;
exports.RuningInfoService = RuningInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(runingInfo_entity_1.RuningInfoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RuningInfoService);
//# sourceMappingURL=runingInfo.service.js.map