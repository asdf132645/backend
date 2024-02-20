// cell-img-analyzed.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CellImgAnalyzed } from './entities/cell.entity';
import { CellImgAnalyzedDto } from './dto/create-cellImg.dto';
import { User } from '../../../user/entities/user.entity'; // Import the User entity

@Injectable()
export class CellImgAnalyzedService {
  constructor(
    @InjectRepository(CellImgAnalyzed)
    private readonly cellImgAnalyzedRepository: Repository<CellImgAnalyzed>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inject the User repository
  ) {}

  async create(dto: CellImgAnalyzedDto): Promise<CellImgAnalyzed> {
    const { userId, ...rest } = dto;
    const user = await this.findUserById(Number(userId)); // 유저 정보 가져오기
    if (!user) {
      throw new NotFoundException(
        `userId ${userId}를 가진 사용자를 찾을 수 없습니다.`,
      );
    }

    const entity = this.cellImgAnalyzedRepository.create({
      ...rest,
      user: { id: user.id }, // 연관된 유저 정보 매칭
    });

    return await this.cellImgAnalyzedRepository.save(entity);
  }

  async update(id: any, dto?: CellImgAnalyzedDto): Promise<CellImgAnalyzed> {
    const entity = await this.findById(id); // Check if entity exists

    if (dto) {
      // If user ID is provided, find the user and assign it to the entity's user property
      if (dto.userId) {
        const user = await this.findUserById(Number(dto.userId));
        if (!user) {
          throw new NotFoundException(
            `User with userId ${dto.userId} not found`,
          );
        }
        entity.user = user;
      }

      // Update other fields of the entity
      Object.assign(entity, dto);
    }

    return await this.cellImgAnalyzedRepository.save(entity);
  }

  async findByUserId(userId: string): Promise<CellImgAnalyzed | undefined> {
    try {
      const queryBuilder = this.cellImgAnalyzedRepository
        .createQueryBuilder('cellImgAnalyzed')
        .leftJoinAndSelect('cellImgAnalyzed.user', 'user')
        .where('user.id = :id', { id: Number(userId) });
      return await queryBuilder.getOne();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  private async findById(id: any): Promise<CellImgAnalyzed> {
    const entity = await this.cellImgAnalyzedRepository.findOne({
      where: { id },
    });
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async findUserById(id: number): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`id가 ${id}인 사용자를 찾을 수 없습니다`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
