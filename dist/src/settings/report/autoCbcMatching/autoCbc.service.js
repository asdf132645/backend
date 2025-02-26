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
exports.AutoCbcService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const autoCbc_entity_1 = require("./autoCbc.entity");
let AutoCbcService = class AutoCbcService {
    constructor(autoCbcRepository) {
        this.autoCbcRepository = autoCbcRepository;
    }
    async findAll() {
        return this.autoCbcRepository.find({ cache: false });
    }
    async findOne(id) {
        return this.autoCbcRepository.findOne({ where: { id } });
    }
    async create(autoCbcData) {
        const newAutoCbc = this.autoCbcRepository.create(autoCbcData);
        return this.autoCbcRepository.save(newAutoCbc);
    }
    async update(id, autoCbcData) {
        await this.autoCbcRepository.update(id, autoCbcData);
        return this.findOne(id);
    }
    async delete(id) {
        await this.autoCbcRepository.delete(id);
    }
    async updateAll(autoCbcDataArray) {
        await this.autoCbcRepository.clear();
        const dataWithOrder = autoCbcDataArray.map((item, index) => ({
            ...item,
            orderIdx: (index + 1).toString(),
        }));
        await this.autoCbcRepository.save(dataWithOrder);
        return this.autoCbcRepository.find({ order: { orderIdx: 'ASC' } });
    }
};
exports.AutoCbcService = AutoCbcService;
exports.AutoCbcService = AutoCbcService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(autoCbc_entity_1.AutoCbc)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AutoCbcService);
//# sourceMappingURL=autoCbc.service.js.map