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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }
    async findOne(userId, password) {
        const user = await this.userRepository.findOne({
            where: { userId },
            select: [
                'id',
                'userId',
                'name',
                'employeeNo',
                'userType',
                'password',
                'subscriptionDate',
                'latestDate',
            ],
        });
        if (!user) {
            console.error('user 존재 안함');
            return undefined;
        }
        const passwordMatch = password === user.password;
        if (passwordMatch) {
            return user;
        }
        else {
            console.error('Password 틀림');
            return undefined;
        }
    }
    async findOneById(userId) {
        const user = await this.userRepository.findOne({
            where: { userId },
            select: [
                'id',
                'userId',
                'name',
                'employeeNo',
                'userType',
                'subscriptionDate',
                'latestDate',
                'pcIp',
            ],
        });
        if (!user) {
            console.error('User not found');
            return undefined;
        }
        return user;
    }
    async findAll(userId) {
        const users = await this.userRepository.find({
            select: [
                'id',
                'userId',
                'name',
                'employeeNo',
                'userType',
                'password',
                'subscriptionDate',
                'latestDate',
            ],
        });
        if (!users || users.length === 0) {
            console.error('Users not found');
            return undefined;
        }
        return users;
    }
    async update(userId, { pcIp, viewerCheck }) {
        try {
            const user = await this.userRepository.findOne({ where: { userId } });
            if (!user) {
                console.error('User not found');
                return undefined;
            }
            await this.userRepository.update(user.id, { pcIp, viewerCheck });
            const updatedUser = await this.userRepository.findOne({
                where: { userId },
            });
            return updatedUser;
        }
        catch (error) {
            console.error('Error updating user:', error);
            return undefined;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map