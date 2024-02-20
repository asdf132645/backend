import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserResponse, LoginDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 200, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found', type: UserResponse })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUser(@Param('userId') userId: string) {
    try {
      const user = await this.userService.findOneById(userId);

      if (user === undefined) {
        return { user: {}, code: 404 };
      } else {
        return { user, code: 200 };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error fetching user' };
    }
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ description: 'User login credentials', type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: UserResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async loginUser(
    @Body() { userId, password }: { userId: string; password: string },
  ) {
    try {
      const user = await this.userService.findOne(userId, password);
      return { user };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  }
}
