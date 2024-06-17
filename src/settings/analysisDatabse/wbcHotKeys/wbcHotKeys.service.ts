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
    const { wbcHotKeysItems } = createDto;
    const createdItems: WbcHotKeys[] = [];
    for (const item of wbcHotKeysItems) {
      const wbcHotKeys = this.wbcHotKeysRepository.create({ ...item });
      const createdItem = await this.wbcHotKeysRepository.save(wbcHotKeys);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(updateDto: CreateWbcHotKeysDto): Promise<WbcHotKeys[]> {
    const { wbcHotKeysItems } = updateDto;

    const updatedItems: WbcHotKeys[] = [];
    for (const item of wbcHotKeysItems) {
      const updatedItem = await this.updateItem(item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(item: any): Promise<WbcHotKeys> {
    const existingWbcHotKeys = await this.wbcHotKeysRepository.findOne({
      where: { id: item.id },
    });

    if (existingWbcHotKeys) {
      await this.wbcHotKeysRepository.update(existingWbcHotKeys.id, item);
      return await this.wbcHotKeysRepository.findOne({
        where: { id: item.id },
      });
    }

    return null;
  }

  async find(): Promise<WbcHotKeys[]> {
    return await this.wbcHotKeysRepository.find();
  }
}
