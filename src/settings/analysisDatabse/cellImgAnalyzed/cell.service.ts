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
    private readonly userRepository: Repository<User>,
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

  async update(id: string, dto: CellImgAnalyzedDto): Promise<CellImgAnalyzed> {
    const { userId, ...rest } = dto;

    // Check if the user with the provided ID exists
    const user = await this.findUserById(Number(userId));
    if (!user) {
      throw new NotFoundException(
        `userId ${userId}를 가진 사용자를 찾을 수 없습니다.`,
      );
    }

    // Check if the entity with the provided ID exists
    const existingEntity = await this.findById(id);
    if (!existingEntity) {
      throw new NotFoundException(
        `id가 ${id}인 세포 이미지 분석을 찾을 수 없습니다.`,
      );
    }

    // Update the entity with the new data
    this.cellImgAnalyzedRepository.merge(existingEntity, {
      ...rest,
      user, // Use the user object directly in the merge
    });

    // Save the updated entity
    return await this.cellImgAnalyzedRepository.save(existingEntity);
  }

  private async findById(id: any): Promise<CellImgAnalyzed> {
    const entity = await this.cellImgAnalyzedRepository.findOne({
      where: { id },
    });
    if (!entity) {
      throw new NotFoundException(`id가 ${id}인 사용자를 찾을 수 없습니다`);
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
