import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CbcCodeEntity } from './cbcCode.entity';
import { CreateCbcCodeDto } from './dto/cbcCodeDto'; // 변경된 부분

@Injectable()
export class CbcCodeService {
  // 변경된 부분
  constructor(
    @InjectRepository(CbcCodeEntity)
    private readonly cbcCodeEntityRepository: Repository<CbcCodeEntity>,
  ) {}

  async create(createDto: CreateCbcCodeDto): Promise<CbcCodeEntity> {
    const { cbcCodeItems } = createDto as CreateCbcCodeDto;
    const createdItems: CbcCodeEntity[] = [];
    for (const item of cbcCodeItems) {
      const cbcCodeEntity = this.cbcCodeEntityRepository.create({ ...item });
      const createdItem =
        await this.cbcCodeEntityRepository.save(cbcCodeEntity);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(updateDto: CreateCbcCodeDto): Promise<CbcCodeEntity[]> {
    const { cbcCodeItems } = updateDto;

    const updatedItems: CbcCodeEntity[] = [];
    for (const item of cbcCodeItems) {
      const updatedItem = await this.updateItem(item);
      updatedItems.push(updatedItem);
    }
    return updatedItems;
  }

  private async updateItem(item: any): Promise<CbcCodeEntity> {
    const existingBfHotKeys = await this.cbcCodeEntityRepository.findOne({
      where: { id: item.id },
    });

    if (existingBfHotKeys) {
      await this.cbcCodeEntityRepository.update(existingBfHotKeys.id, item);
      return await this.cbcCodeEntityRepository.findOne({
        where: { id: item.id },
      });
    }

    return null;
  }

  async find(): Promise<CbcCodeEntity[]> {
    return await this.cbcCodeEntityRepository.find();
  }
}
