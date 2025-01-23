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

    const existingEntities = await this.cbcCodeEntityRepository.find();
    const existingIdSet = new Set(existingEntities.map((entity) => entity.id));
    const incomingIdSet = new Set(cbcCodeItems.map((item) => item.id));

    const updateOrInsertPromises = cbcCodeItems.map(async (item) => {
      if (existingIdSet.has(item.id)) {
        await this.cbcCodeEntityRepository.update(item.id, item);
      } else {
        await this.cbcCodeEntityRepository.save(item);
      }
    });

    const deletePromises = Array.from(existingIdSet)
      .filter((id) => !incomingIdSet.has(id))
      .map((id) => this.cbcCodeEntityRepository.delete(id));

    await Promise.all([...updateOrInsertPromises, ...deletePromises]);

    return await this.cbcCodeEntityRepository.find();
  }

  async find(): Promise<CbcCodeEntity[]> {
    return await this.cbcCodeEntityRepository.find();
  }
}
