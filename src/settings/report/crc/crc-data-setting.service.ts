import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrcDataSettingEntity } from './entities/crc-data-setting.entity';
import { CreateCrcDataSettingDto } from './dto/crc-data-setting.dto';

@Injectable()
export class CrcDataSettingService {
  constructor(
    @InjectRepository(CrcDataSettingEntity)
    private readonly crcDataSettingRepository: Repository<CrcDataSettingEntity>,
  ) {}

  async create(
    createCrcDataSettingDto: CreateCrcDataSettingDto,
  ): Promise<CrcDataSettingEntity> {
    const crcDataSetting = this.crcDataSettingRepository.create(
      createCrcDataSettingDto,
    );
    return this.crcDataSettingRepository.save(crcDataSetting);
  }

  async findAll(): Promise<CrcDataSettingEntity[]> {
    return this.crcDataSettingRepository.find();
  }

  async findOne(id: number): Promise<CrcDataSettingEntity> {
    return this.crcDataSettingRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.crcDataSettingRepository.delete(id);
  }
}
