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
    try {
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (e) {
      return e.sqlMessage;
    }
  }

  async findOne(
    userId: string,
    password: string,
  ): Promise<User | string | undefined> {
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
      const updatedUser = await this.userRepository.findOne({
        where: { userId },
      });
      return updatedUser;
    } else {
      console.error('Password 틀림');
      return undefined;
    }
  }

  async logout(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: Number(userId) },
    });

    if (!user) {
      console.log('User not found');
      return false;
    }

    return true;
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
        // 'pcIp',
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

  async update(
    userId: string,
    { userType, name, employeeNo }: Partial<CreateUserDto>,
  ): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { userId } });

      if (!user) {
        console.error('User not found');
        return undefined;
      }

      await this.userRepository.update(user.id, {
        userType,
        name,
        employeeNo,
      });
      const updatedUser = await this.userRepository.findOne({
        where: { userId },
      });

      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      return undefined;
    }
  }

  async delete(userId: string): Promise<boolean> {
    const result = await this.userRepository.delete({ userId });

    if (result.affected > 0) return true;
    return false;
  }
}
