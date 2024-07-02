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
    const { ...rest } = dto;
    const entity = this.cellImgAnalyzedRepository.create({ ...rest });
    return await this.cellImgAnalyzedRepository.save(entity);
  }

  async find(): Promise<CellImgAnalyzed | undefined> {
    try {
      const queryBuilder =
        this.cellImgAnalyzedRepository.createQueryBuilder('cellImgAnalyzed');
      return await queryBuilder.getOne();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async update(id: string, dto: CellImgAnalyzedDto): Promise<CellImgAnalyzed> {
    const { ...rest } = dto;

    // Check if the entity with the provided ID exists
    const existingEntity = await this.findById(id);
    if (!existingEntity) {
      throw new NotFoundException(
        `id가 ${id}인 세포 이미지 분석을 찾을 수 없습니다.`,
      );
    }

    // Update the entity with the new data
    this.cellImgAnalyzedRepository.merge(existingEntity, { ...rest });

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
}
