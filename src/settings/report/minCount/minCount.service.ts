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
    const { userId, minCountItems } = createDto as CreateMinCountDto;
    const createdItems: MinCountEntity[] = [];
    for (const item of minCountItems) {
      const imagePrintEntity = this.minCountEntityRepository.create({
        ...item,
        userId,
      });
      const createdItem =
        await this.minCountEntityRepository.save(imagePrintEntity);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(
    userId: number,
    updateDto: CreateMinCountDto,
  ): Promise<MinCountEntity[]> {
    const { minCountItems } = updateDto;

    const updatedItems: MinCountEntity[] = [];
    for (const item of minCountItems) {
      const updatedItem = await this.updateItem(userId, item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(userId: number, item: any): Promise<MinCountEntity> {
    const existingMinCount = await this.minCountEntityRepository.findOne({
      where: { userId, id: item.id },
    });

    if (existingMinCount) {
      await this.minCountEntityRepository.update(existingMinCount.id, item);
      return await this.minCountEntityRepository.findOne({
        where: { userId, id: item.id },
      });
    }

    return null;
  }

  async findByUserId(userId: number): Promise<MinCountEntity[]> {
    return await this.minCountEntityRepository.find({ where: { userId } });
  }
}
