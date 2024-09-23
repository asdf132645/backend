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
exports.RuningInfoResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const runingInfo_service_1 = require("./runingInfo.service");
const runingInfo_entity_1 = require("./runingInfo.entity");
const runingInfoDtoItems_1 = require("./dto/runingInfoDtoItems");
let RuningInfoResolver = class RuningInfoResolver {
    constructor(runningInfoService) {
        this.runningInfoService = runningInfoService;
    }
    async createRunningInfo(createRunningInfoDto) {
        const newEntity = await this.runningInfoService.create(createRunningInfoDto);
        console.log('resolver');
        if (!newEntity) {
            throw new Error('Failed to create running info: entity already exists within the time frame.');
        }
        return newEntity;
    }
    async getRunningInfoById(id) {
        const entity = await this.runningInfoService.getRunningInfoById(id);
        if (!entity) {
            throw new Error(`Running info with id ${id} not found.`);
        }
        return entity;
    }
};
exports.RuningInfoResolver = RuningInfoResolver;
__decorate([
    (0, graphql_1.Mutation)(() => runingInfo_entity_1.RuningInfoEntity),
    __param(0, (0, graphql_1.Args)('createRunningInfoDto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [runingInfoDtoItems_1.CreateRuningInfoDto]),
    __metadata("design:returntype", Promise)
], RuningInfoResolver.prototype, "createRunningInfo", null);
__decorate([
    (0, graphql_1.Query)(() => runingInfo_entity_1.RuningInfoEntity, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RuningInfoResolver.prototype, "getRunningInfoById", null);
exports.RuningInfoResolver = RuningInfoResolver = __decorate([
    (0, graphql_1.Resolver)(() => runingInfo_entity_1.RuningInfoEntity),
    __metadata("design:paramtypes", [runingInfo_service_1.RuningInfoService])
], RuningInfoResolver);
//# sourceMappingURL=runningInfo.resolver.js.map