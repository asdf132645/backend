import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LisCodeWbcEntity } from './lisCodeWbc.entity';
import { CreateLisCodeDto } from './dto/lisCodeWbcDto'; // 변경된 부분

@Injectable()
export class LisCodeWbcService {
  // 변경된 부분
  constructor(
    @InjectRepository(LisCodeWbcEntity)
    private readonly lisCodeEntityRepository: Repository<LisCodeWbcEntity>,
  ) {}

  async create(createDto: CreateLisCodeDto): Promise<LisCodeWbcEntity> {
    const { lisCodeItems } = createDto as CreateLisCodeDto;
    const createdItems: LisCodeWbcEntity[] = [];
    for (const item of lisCodeItems) {
      const lisCodeEntity = this.lisCodeEntityRepository.create({ ...item });
      const createdItem = await this.lisCodeEntityRepository.save(lisCodeEntity);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(updateDto: CreateLisCodeDto): Promise<LisCodeWbcEntity[]> {
    const { lisCodeItems } = updateDto;

    const updatedItems: LisCodeWbcEntity[] = [];
    for (const item of lisCodeItems) {
      const updatedItem = await this.updateItem(item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(item: any): Promise<LisCodeWbcEntity> {
    const existingLisCode = await this.lisCodeEntityRepository.findOne({
      where: { id: item.id },
    });

    if (existingLisCode) {
      await this.lisCodeEntityRepository.update(existingLisCode.id, item);
      return await this.lisCodeEntityRepository.findOne({
        where: { id: item.id },
      });
    }
    return null;
  }

  async find(): Promise<LisCodeWbcEntity[]> {
    return await this.lisCodeEntityRepository.find();
  }
}
