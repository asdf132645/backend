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
exports.LoginDto = exports.UserResponse = exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'honggildong', description: 'User ID' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123', description: 'User password' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '홍길동', description: 'User name' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345', description: 'Employee number' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "employeeNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin', description: 'User type' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-02-13T12:34:56Z',
        description: 'Subscription date',
    }),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "subscriptionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-02-13T12:34:56Z',
        description: 'Latest update date',
    }),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "latestDate", void 0);
class UserResponse {
}
exports.UserResponse = UserResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'honggildong', description: 'User ID' }),
    __metadata("design:type", String)
], UserResponse.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123', description: 'User password' }),
    __metadata("design:type", String)
], UserResponse.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '홍길동', description: 'User name' }),
    __metadata("design:type", String)
], UserResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345', description: 'Employee number' }),
    __metadata("design:type", String)
], UserResponse.prototype, "employeeNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin', description: 'User type' }),
    __metadata("design:type", String)
], UserResponse.prototype, "userType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-02-13T12:34:56Z',
        description: 'Subscription date',
    }),
    __metadata("design:type", Date)
], UserResponse.prototype, "subscriptionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-02-13T12:34:56Z',
        description: 'Latest update date',
    }),
    __metadata("design:type", Date)
], UserResponse.prototype, "latestDate", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'honggildong', description: 'User ID' }),
    __metadata("design:type", String)
], LoginDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123', description: 'User password' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
//# sourceMappingURL=create-user.dto.js.map