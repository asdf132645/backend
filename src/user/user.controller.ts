// user.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserDto(user));
  }

  @Post()
  async create(@Body() userDto: UserDto): Promise<UserDto> {
    const createdUser = await this.userService.create(userDto);
    return new UserDto(createdUser);
  }

  // 다른 CRUD 엔드포인트들도 추가 가능
}
