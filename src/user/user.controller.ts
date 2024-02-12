// src/users/user.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':userId')
  async getUser(
    @Param('userId') userId: string,
    @Query('password') password: string,
  ) {
    try {
      const user = await this.userService.findOne(userId, password);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message || 'Error fetching user' };
    }
  }

  @Post('login')
  async loginUser(
    @Body() { userId, password }: { userId: string; password: string },
  ) {
    try {
      const user = await this.userService.findOne(userId, password);
      console.log(user);
      if (!user) {
        console.log('ss');
        return { success: false, data: user };
      }
      return { user };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  }
}
