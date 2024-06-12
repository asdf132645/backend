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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(createUserDto) {
        return this.userService.create(createUserDto);
    }
    async getUser(userId) {
        try {
            console.log(userId);
            const user = await this.userService.findOneById(userId);
            if (user === undefined) {
                return { user: {}, code: 404 };
            }
            else {
                return { user, code: 200 };
            }
        }
        catch (error) {
            return { success: false, error: error.message || 'Error fetching user' };
        }
    }
    async getALLUsers(userId) {
        try {
            const users = await this.userService.findAll(userId);
            if (users === undefined) {
                return { users: [], code: 404 };
            }
            else {
                return { users, code: 200 };
            }
        }
        catch (error) {
            return { success: false, error: error.message || 'Error Fetching User' };
        }
    }
    async loginUser({ userId, password }) {
        try {
            const user = await this.userService.findOne(userId, password);
            return { user };
        }
        catch (error) {
            return { success: false, error: error.message || 'Login failed' };
        }
    }
    async updateUser({ pcIp, viewerCheck, userId }) {
        try {
            const updatedUser = await this.userService.update(userId, {
                pcIp,
                viewerCheck,
            });
            if (updatedUser === undefined) {
                return { success: false, error: 'User not found' };
            }
            return { user: updatedUser, code: 200 };
        }
        catch (error) {
            return { success: false, error: error.message || 'Error updating user' };
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('/register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User registered successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User found', type: create_user_dto_1.UserResponse }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('/getUsers/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All users found',
        type: create_user_dto_1.UserResponse,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Users not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getALLUsers", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiOperation)({ summary: 'Login user' }),
    (0, swagger_1.ApiBody)({ description: 'User login credentials', type: create_user_dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User logged in successfully',
        type: create_user_dto_1.UserResponse,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Put)('/update'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user information' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID' }),
    (0, swagger_1.ApiBody)({ description: 'Updated user data', type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User information updated successfully',
        type: create_user_dto_1.UserResponse,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map