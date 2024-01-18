// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserDto(user));
  }

  async create(userDto: UserDto): Promise<UserDto> {
    const user = new User(userDto);
    const createdUser = await this.userRepository.save(user);
    return new UserDto(createdUser);
  }

  // 다른 CRUD 메서드들도 추가 가능
}
