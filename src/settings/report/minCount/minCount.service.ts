import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinCountEntity } from './minCount.entity';
import { CreateMinCountDto } from './dto/minCountDto';

@Injectable()
export class MinCountService {
  constructor(
    @InjectRepository(MinCountEntity)
    private readonly minCountEntityRepository: Repository<MinCountEntity>,
  ) {}

  async create(createDto: CreateMinCountDto): Promise<MinCountEntity> {
    const { minCountItems } = createDto as CreateMinCountDto;
    const createdItems: MinCountEntity[] = [];
    for (const item of minCountItems) {
      const imagePrintEntity = this.minCountEntityRepository.create({ ...item });
      const createdItem =
        await this.minCountEntityRepository.save(imagePrintEntity);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(updateDto: CreateMinCountDto): Promise<MinCountEntity[]> {
    const { minCountItems } = updateDto;

    const updatedItems: MinCountEntity[] = [];
    for (const item of minCountItems) {
      const updatedItem = await this.updateItem(item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(item: any): Promise<MinCountEntity> {
    const existingMinCount = await this.minCountEntityRepository.findOne({
      where: { id: item.id },
    });

    if (existingMinCount) {
      await this.minCountEntityRepository.update(existingMinCount.id, item);
      return await this.minCountEntityRepository.findOne({
        where: { id: item.id },
      });
    }

    return null;
  }

  async find(): Promise<MinCountEntity[]> {
    return await this.minCountEntityRepository.find();
  }
}
