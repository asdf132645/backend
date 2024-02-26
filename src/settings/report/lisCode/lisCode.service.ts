import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LisCodeEntity } from './lisCode.entity';
import { CreateLisCodeDto } from './dto/lisCodeDto'; // 변경된 부분

@Injectable()
export class LisCode {
  // 변경된 부분
  constructor(
    @InjectRepository(LisCodeEntity)
    private readonly lisCodeEntityRepository: Repository<LisCodeEntity>,
  ) {}

  async create(createDto: CreateLisCodeDto): Promise<LisCodeEntity> {
    const { userId, lisCodeItems } = createDto as CreateLisCodeDto;
    const createdItems: LisCodeEntity[] = [];
    for (const item of lisCodeItems) {
      const lisCodeEntity = this.lisCodeEntityRepository.create({
        ...item,
        userId,
      });
      const createdItem =
        await this.lisCodeEntityRepository.save(lisCodeEntity);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(
    userId: number,
    updateDto: CreateLisCodeDto,
  ): Promise<LisCodeEntity[]> {
    const { lisCodeItems } = updateDto;

    const updatedItems: LisCodeEntity[] = [];
    for (const item of lisCodeItems) {
      const updatedItem = await this.updateItem(userId, item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(userId: number, item: any): Promise<LisCodeEntity> {
    const existingLisCode = await this.lisCodeEntityRepository.findOne({
      where: { userId, id: item.id },
    });

    if (existingLisCode) {
      await this.lisCodeEntityRepository.update(existingLisCode.id, item);
      return await this.lisCodeEntityRepository.findOne({
        where: { userId, id: item.id },
      });
    }

    return null;
  }

  async findByUserId(userId: number): Promise<LisCodeEntity[]> {
    return await this.lisCodeEntityRepository.find({ where: { userId } });
  }
}
