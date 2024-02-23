// src/wbc-hot-keys/wbc-hot-keys.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WbcHotKeys } from './wbcHotKeys.entity';
import { CreateWbcHotKeysDto } from './dto/wbcHotKeys.dto';

@Injectable()
export class WbcHotKeysService {
  constructor(
    @InjectRepository(WbcHotKeys)
    private readonly wbcHotKeysRepository: Repository<WbcHotKeys>,
  ) {}

  async create(createDto: CreateWbcHotKeysDto): Promise<WbcHotKeys> {
    const { userId, wbcHotKeysItems } = createDto;
    const createdItems: WbcHotKeys[] = [];
    for (const item of wbcHotKeysItems) {
      const wbcHotKeys = this.wbcHotKeysRepository.create({
        ...item,
        userId,
      });
      const createdItem = await this.wbcHotKeysRepository.save(wbcHotKeys);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(
    userId: number,
    updateDto: CreateWbcHotKeysDto,
  ): Promise<WbcHotKeys[]> {
    const { wbcHotKeysItems } = updateDto;

    const updatedItems: WbcHotKeys[] = [];
    for (const item of wbcHotKeysItems) {
      const updatedItem = await this.updateItem(userId, item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(userId: number, item: any): Promise<WbcHotKeys> {
    const existingWbcHotKeys = await this.wbcHotKeysRepository.findOne({
      where: { userId, order: item.order },
    });

    if (existingWbcHotKeys) {
      await this.wbcHotKeysRepository.update(existingWbcHotKeys.id, item);
      return await this.wbcHotKeysRepository.findOne({
        where: { userId, order: item.order },
      });
    }

    return null;
  }


  async findByUserId(userId: number): Promise<WbcHotKeys[]> {
    return await this.wbcHotKeysRepository.find({ where: { userId } });
  }
}