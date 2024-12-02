import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrcSaveDataEntity } from './entities/crc_save_data.entity';

@Injectable()
export class CrcSaveDataService {
  constructor(
    @InjectRepository(CrcSaveDataEntity)
    private readonly crcSaveDataRepository: Repository<CrcSaveDataEntity>,
  ) {}

  async findAll(): Promise<CrcSaveDataEntity[]> {
    return this.crcSaveDataRepository.find();
  }

  async findOneBySlotId(slotId: string): Promise<CrcSaveDataEntity> {
    return this.crcSaveDataRepository.findOne({ where: { slotId } });
  }

  async create(data: Partial<CrcSaveDataEntity>): Promise<CrcSaveDataEntity> {
    const newData = this.crcSaveDataRepository.create(data);
    return this.crcSaveDataRepository.save(newData);
  }

  async updateBySlotId(
    slotId: string,
    data: Partial<CrcSaveDataEntity>,
  ): Promise<CrcSaveDataEntity> {
    const existingData = await this.findOneBySlotId(slotId);
    if (!existingData) {
      throw new Error(`Data with slotId "${slotId}" not found`);
    }
    const updatedData = this.crcSaveDataRepository.merge(existingData, data);
    return this.crcSaveDataRepository.save(updatedData);
  }

  async deleteBySlotId(slotId: string): Promise<void> {
    const existingData = await this.findOneBySlotId(slotId);
    if (!existingData) {
      throw new Error(`Data with slotId "${slotId}" not found`);
    }
    await this.crcSaveDataRepository.delete({ slotId });
  }
}
