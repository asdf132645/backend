// src/users/user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { compare } from 'bcrypt'; // bcrypt 모듈 추가

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findOne(userId: string, password: string): Promise<User | undefined> {
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

    if (user && (await compare(password, user.password))) {
      // Passwords match
      return user;
    }

    // No user found or password doesn't match
    return undefined;
  }
}
