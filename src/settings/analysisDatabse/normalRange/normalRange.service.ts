import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NormalRange } from './normalRange.entity';
import { NormalRangeDto } from './dto/normalRangeDto';

@Injectable()
export class NormalRangeService {
  constructor(
    @InjectRepository(NormalRange)
    private readonly normalRangeRepository: Repository<NormalRange>,
  ) {}

  async create(createDto: NormalRangeDto): Promise<NormalRange> {
    const { userId, normalRangeItems } = createDto;
    const createdItems: NormalRange[] = [];
    for (const item of normalRangeItems) {
      const normalRange = this.normalRangeRepository.create({
        ...item,
        userId,
      });
      const createdItem = await this.normalRangeRepository.save(normalRange);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(
    userId: number,
    updateDto: NormalRangeDto,
  ): Promise<NormalRange[]> {
    const { normalRangeItems } = updateDto;

    const updatedItems: NormalRange[] = [];
    for (const item of normalRangeItems) {
      const updatedItem = await this.updateItem(userId, item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(userId: number, item: any): Promise<NormalRange> {
    const existingNormalRange = await this.normalRangeRepository.findOne({
      where: { userId },
    });

    if (existingNormalRange) {
      await this.normalRangeRepository.update(existingNormalRange.userId, item);
      return await this.normalRangeRepository.findOne({
        where: { userId },
      });
    }

    return null;
  }

  async findByUserId(userId: number): Promise<NormalRange[]> {
    return await this.normalRangeRepository.find({ where: { userId } });
  }
}
