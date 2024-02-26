import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LisCodeRbcEntity } from './lisCodeRbc.entity';
import { CreateLisCodeRbcDto } from './dto/lisCodeRbcDto';

@Injectable()
export class LisCodeRbcService {
  // 변경된 부분
  constructor(
    @InjectRepository(LisCodeRbcEntity)
    private readonly lisCodeRbcEntityRepository: Repository<LisCodeRbcEntity>,
  ) {}

  async create(createDto: CreateLisCodeRbcDto): Promise<LisCodeRbcEntity> {
    const { userId, lisCodeItems } = createDto as CreateLisCodeRbcDto;
    const createdItems: LisCodeRbcEntity[] = [];
    for (const item of lisCodeItems) {
      const lisCodeEntity = this.lisCodeRbcEntityRepository.create({
        ...item,
        userId,
      });
      const createdItem =
        await this.lisCodeRbcEntityRepository.save(lisCodeEntity);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(
    userId: number,
    updateDto: CreateLisCodeRbcDto,
  ): Promise<LisCodeRbcEntity[]> {
    const { lisCodeItems } = updateDto;

    const updatedItems: LisCodeRbcEntity[] = [];
    for (const item of lisCodeItems) {
      const updatedItem = await this.updateItem(userId, item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(
    userId: number,
    item: any,
  ): Promise<LisCodeRbcEntity> {
    const existingLisCode = await this.lisCodeRbcEntityRepository.findOne({
      where: { userId, id: item.id },
    });

    if (existingLisCode) {
      await this.lisCodeRbcEntityRepository.update(existingLisCode.id, item);
      return await this.lisCodeRbcEntityRepository.findOne({
        where: { userId, id: item.id },
      });
    }

    return null;
  }

  async findByUserId(userId: number): Promise<LisCodeRbcEntity[]> {
    return await this.lisCodeRbcEntityRepository.find({ where: { userId } });
  }
}
