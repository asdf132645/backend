import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrcSettingEntity } from './entities/crc-setting.entity';
import { CreateCrcSettingDto } from './dto/crc-setting.dto';

@Injectable()
export class CrcSettingService {
  constructor(
    @InjectRepository(CrcSettingEntity)
    private readonly crcSettingRepository: Repository<CrcSettingEntity>,
  ) {}

  async create(
    createCrcSettingDto: CreateCrcSettingDto,
  ): Promise<CrcSettingEntity> {
    const crcSetting = this.crcSettingRepository.create(createCrcSettingDto);
    return this.crcSettingRepository.save(crcSetting);
  }

  async findAll(): Promise<CrcSettingEntity[]> {
    return this.crcSettingRepository.find();
  }

  async findOne(id: number): Promise<CrcSettingEntity> {
    return this.crcSettingRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.crcSettingRepository.delete(id);
  }
}
