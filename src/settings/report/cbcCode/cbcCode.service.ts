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
    const { userId, cbcCodeItems } = createDto as CreateCbcCodeDto;
    const createdItems: CbcCodeEntity[] = [];
    for (const item of cbcCodeItems) {
      const cbcCodeEntity = this.cbcCodeEntityRepository.create({
        ...item,
        userId,
      });
      const createdItem =
        await this.cbcCodeEntityRepository.save(cbcCodeEntity);
      createdItems.push(createdItem);
    }

    return createdItems[0];
  }

  async update(
    userId: number,
    updateDto: CreateCbcCodeDto,
  ): Promise<CbcCodeEntity[]> {
    const { cbcCodeItems } = updateDto;

    const updatedItems: CbcCodeEntity[] = [];
    for (const item of cbcCodeItems) {
      const updatedItem = await this.updateItem(userId, item);
      updatedItems.push(updatedItem);
    }

    return updatedItems;
  }

  private async updateItem(userId: number, item: any): Promise<CbcCodeEntity> {
    const existingBfHotKeys = await this.cbcCodeEntityRepository.findOne({
      where: { userId, id: item.id },
    });

    if (existingBfHotKeys) {
      await this.cbcCodeEntityRepository.update(existingBfHotKeys.id, item);
      return await this.cbcCodeEntityRepository.findOne({
        where: { userId, id: item.id },
      });
    }

    return null;
  }

  async findByUserId(userId: number): Promise<CbcCodeEntity[]> {
    return await this.cbcCodeEntityRepository.find({ where: { userId } });
  }
}
