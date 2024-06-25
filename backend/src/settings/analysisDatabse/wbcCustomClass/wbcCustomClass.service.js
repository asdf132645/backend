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
exports.WbcCustomClassService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wbcCustomClass_entity_1 = require("./wbcCustomClass.entity");
let WbcCustomClassService = class WbcCustomClassService {
    constructor(wbcCustomClassRepository) {
        this.wbcCustomClassRepository = wbcCustomClassRepository;
    }
    async create(createDto) {
        const { classArr } = createDto;
        const createdClasses = [];
        for (const classItem of classArr) {
            const wbcCustomClass = this.wbcCustomClassRepository.create({
                abbreviation: classItem.abbreviation,
                fullNm: classItem.fullNm,
                customNum: classItem.customNum,
            });
            const createdClass = await this.wbcCustomClassRepository.save(wbcCustomClass);
            createdClasses.push(createdClass);
        }
        return createdClasses;
    }
    async update(updateDto) {
        const { classArr } = updateDto;
        const updatedClasses = [];
        for (const classItem of classArr) {
            const wbcCustomClass = this.wbcCustomClassRepository.create({
                abbreviation: classItem.abbreviation,
                fullNm: classItem.fullNm,
                customNum: classItem.customNum,
            });
            await this.wbcCustomClassRepository.update({ id: classItem?.id }, wbcCustomClass);
            const updatedClass = await this.wbcCustomClassRepository.findOne({
                where: { customNum: classItem?.id },
            });
            updatedClasses.push(updatedClass);
        }
        return updatedClasses;
    }
    async findAll() {
        return this.wbcCustomClassRepository.find();
    }
    async find() {
        return this.wbcCustomClassRepository.find();
    }
};
exports.WbcCustomClassService = WbcCustomClassService;
exports.WbcCustomClassService = WbcCustomClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wbcCustomClass_entity_1.WbcCustomClass)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WbcCustomClassService);
//# sourceMappingURL=wbcCustomClass.service.js.map