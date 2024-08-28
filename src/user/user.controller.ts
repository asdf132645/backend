import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserResponse, LoginDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 200, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return result;
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

  @Get('/getUsers/:userId')
  @ApiOperation({ summary: 'Get all users' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'All users found',
    type: UserResponse,
  })
  @ApiResponse({ status: 404, description: 'Users not found' })
  async getALLUsers(@Param('userId') userId: string) {
    try {
      const users = await this.userService.findAll(userId);

      if (users === undefined) {
        return { users: [], code: 404 };
      } else {
        return { users, code: 200 };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error Fetching User' };
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
      await this.redis.flushall();
      const user = await this.userService.findOne(userId, password);
      return { user };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Logout user' })
  async logoutUser(@Body() { userId }: { userId: string }) {
    try {
      return await this.userService.logout(userId);
    } catch (error) {
      return false;
    }
  }

  @Put('/update/:userId')
  @ApiOperation({ summary: 'Update user information' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiBody({ description: 'Updated user data', type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User information updated successfully',
    type: UserResponse,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUser(
    @Param('userId') userId: string,
    @Body() { userType, name, employeeNo }: Partial<CreateUserDto>,
  ) {
    try {
      const updatedUser = await this.userService.update(userId, {
        userType,
        name,
        employeeNo,
      });

      if (updatedUser === undefined) {
        return { success: false, error: 'User not found' };
      }
      return { user: updatedUser, code: 200 };
    } catch (error) {
      return { success: false, error: error.message || 'Error updating user' };
    }
  }

  @Delete('/delete')
  async deleteUser(@Body() { userId }: Pick<CreateUserDto, 'userId'>) {
    try {
      const isUserDeleted = await this.userService.delete(userId);

      if (isUserDeleted) {
        return { success: true, code: 200 };
      }
      return { success: false, error: 'User not found' };
    } catch (error) {
      return { success: false, error: error.message || 'Error deleting user' };
    }
  }
}
