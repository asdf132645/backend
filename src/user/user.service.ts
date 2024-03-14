import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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

    if (!user) {
      console.error('user 존재 안함');
      return undefined;
    }

    const passwordMatch = password === user.password;

    if (passwordMatch) {
      // Passwords match
      return user;
    } else {
      console.error('Password 틀림');
      return undefined;
    }
  }

  async findOneById(userId: string): Promise<User | undefined> {
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
      ],
    });

    if (!user) {
      console.error('User not found');
      return undefined;
    }

    return user;
  }

  async findAll(userId: string): Promise<User[] | undefined> {
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
}
