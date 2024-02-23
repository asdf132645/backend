
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BfHotKeys } from './bfHotKeys.entity';
import { CreateBfHotKeysDto } from './dto/bfHotKeysDto'; // 변경된 부분

@Injectable()
export class BfHotKeysService {
  // 변경된 부분
  constructor(
    @InjectRepository(BfHotKeys)
    private readonly bfHotKeysRepository: Repository<BfHotKeys>,
  ) {}

  async create(createDto: CreateBfHotKeysDto): Promise<BfHotKeys> {
    // 변경된 부분
    const { userId, bfHotKeysItems } = createDto;
    const createdItems: BfHotKeys[] = [];
    for (const item of bfHotKeysItems) {
      const bfHotKeys = this.bfHotKeysRepository.create({
        ...item,
        userId,
      });
      const createdItem = await this.bfHotKeysRepository.save(bfHotKeys);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(
    userId: number,
    updateDto: CreateBfHotKeysDto, // 변경된 부분
  ): Promise<BfHotKeys[]> {
    const { bfHotKeysItems } = updateDto;

    const updatedItems: BfHotKeys[] = [];
    for (const item of bfHotKeysItems) {
      const updatedItem = await this.updateItem(userId, item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(userId: number, item: any): Promise<BfHotKeys> {
    const existingBfHotKeys = await this.bfHotKeysRepository.findOne({
      where: { userId, order: item.order },
    });

    if (existingBfHotKeys) {
      await this.bfHotKeysRepository.update(existingBfHotKeys.id, item);
      return await this.bfHotKeysRepository.findOne({
        where: { userId, order: item.order },
      });
    }

    return null;
  }

  async findByUserId(userId: number): Promise<BfHotKeys[]> {
    return await this.bfHotKeysRepository.find({ where: { userId } });
  }
}
