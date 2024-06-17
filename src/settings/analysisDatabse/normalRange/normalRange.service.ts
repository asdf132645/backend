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
    const { normalRangeItems } = createDto;
    const createdItems: NormalRange[] = [];
    for (const item of normalRangeItems) {
      const normalRange = this.normalRangeRepository.create({ ...item });
      const createdItem = await this.normalRangeRepository.save(normalRange);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(updateDto: NormalRangeDto): Promise<NormalRange[]> {
    const { normalRangeItems } = updateDto;

    const updatedItems: NormalRange[] = [];
    for (const item of normalRangeItems) {
      const updatedItem = await this.updateItem(item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(item: any): Promise<NormalRange> {
    const existingNormalRange = await this.normalRangeRepository.findOne({
      where: { id: item.id },
    });

    if (existingNormalRange) {
      await this.normalRangeRepository.update(existingNormalRange.id, item);
      return await this.normalRangeRepository.findOne({
        where: { id: item.id },
      });
    }

    return null;
  }

  async find(): Promise<NormalRange[]> {
    return await this.normalRangeRepository.find();
  }
}
