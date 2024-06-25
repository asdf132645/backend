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
exports.ClassOrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const classOrder_1 = require("./classOrder");
let ClassOrderService = class ClassOrderService {
    constructor(classOrderRepository) {
        this.classOrderRepository = classOrderRepository;
    }
    async getClassOrders() {
        const classOrders = await this.classOrderRepository.find();
        return classOrders.map(this.entityToDto);
    }
    async createClassOrder(createDtos) {
        const newClassOrders = [];
        for (const dto of createDtos) {
            const existingOrder = await this.classOrderRepository.find();
            if (existingOrder.length === 0 || !existingOrder) {
                const classOrderEntity = new classOrder_1.ClassOrder();
                classOrderEntity.id = Number(dto.id);
                classOrderEntity.abbreviation = dto.abbreviation;
                classOrderEntity.fullNm = dto.fullNm;
                classOrderEntity.orderIdx = dto.orderIdx;
                newClassOrders.push(classOrderEntity);
            }
        }
        const savedClassOrders = await this.classOrderRepository.save(newClassOrders);
        return savedClassOrders;
    }
    async updateClassOrders(newData) {
        const updatedData = [];
        for (const dto of newData) {
            const existingRecord = await this.classOrderRepository.findOne({
                where: { id: Number(dto.id) },
            });
            if (existingRecord) {
                existingRecord.orderIdx = dto.orderIdx;
                await this.classOrderRepository.save(existingRecord);
                updatedData.push(this.entityToDto(existingRecord));
            }
            else {
                const createdRecord = await this.createClassOrder([dto]);
                if (createdRecord && createdRecord.length > 0) {
                    updatedData.push(createdRecord[0]);
                }
            }
        }
        return updatedData;
    }
    entityToDto(classOrder) {
        const { id, abbreviation, fullNm, orderIdx } = classOrder;
        return {
            id: Number(id),
            abbreviation,
            fullNm,
            orderIdx,
        };
    }
    dtoToEntity(dto) {
        const { id, abbreviation, fullNm, orderIdx } = dto;
        const classOrderEntity = new classOrder_1.ClassOrder();
        classOrderEntity.id = Number(id);
        classOrderEntity.abbreviation = abbreviation;
        classOrderEntity.fullNm = fullNm;
        classOrderEntity.orderIdx = orderIdx;
        return classOrderEntity;
    }
};
exports.ClassOrderService = ClassOrderService;
exports.ClassOrderService = ClassOrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(classOrder_1.ClassOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClassOrderService);
//# sourceMappingURL=classOrder.service.js.map