import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WbcRunCountEntity } from './wbcRunCount.entity';
import { CreateWbcRunCountDto } from './dto/wbcRunCountDto';

@Injectable()
export class WbcCountSetService {
  constructor(
    @InjectRepository(WbcRunCountEntity)
    private readonly wbcRunCountEntityRepository: Repository<WbcRunCountEntity>,
  ) {}

  async create(createDto: CreateWbcRunCountDto): Promise<WbcRunCountEntity> {
    const { wbcRunCountItems } = createDto as CreateWbcRunCountDto;
    const createdItems: WbcRunCountEntity[] = [];
    if (wbcRunCountItems && wbcRunCountItems.length) {
      for (const item of wbcRunCountItems) {
        const imagePrintEntity = this.wbcRunCountEntityRepository.create({ ...item });
        const createdItem = await this.wbcRunCountEntityRepository.save(imagePrintEntity);
        createdItems.push(createdItem);
      }
    }

    return createdItems[0];
  }

  async update(updateDto: CreateWbcRunCountDto): Promise<WbcRunCountEntity[]> {
    const { wbcRunCountItems } = updateDto;

    const updatedItems: WbcRunCountEntity[] = [];
    if (wbcRunCountItems && wbcRunCountItems.length) {
      for (const item of wbcRunCountItems) {
        const updatedItem = await this.updateItem(item);
        updatedItems.push(updatedItem);
      }
    }
    return updatedItems;
  }

  private async updateItem(item: any): Promise<WbcRunCountEntity> {
    const existingFilePathSet = await this.wbcRunCountEntityRepository.findOne({
      where: { id: item.id },
    });

    if (existingFilePathSet) {
      await this.wbcRunCountEntityRepository.update(
        existingFilePathSet.id,
        item,
      );
      return await this.wbcRunCountEntityRepository.findOne({
        where: { id: item.id },
      });
    }

    return null;
  }

  async find(): Promise<WbcRunCountEntity[]> {
    return await this.wbcRunCountEntityRepository.find();
  }
}
