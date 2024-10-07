import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrcRemarkSettingEntity } from './entities/crc-remark-setting.entity';
import { CreateCrcRemarkSettingDto } from './dto/crc-remark-setting.dto';

@Injectable()
export class CrcRemarkSettingService {
  constructor(
    @InjectRepository(CrcRemarkSettingEntity)
    private readonly crcRemarkSettingRepository: Repository<CrcRemarkSettingEntity>,
  ) {}

  async create(
    createCrcRemarkSettingDto: CreateCrcRemarkSettingDto,
  ): Promise<CrcRemarkSettingEntity> {
    const crcRemarkSetting = this.crcRemarkSettingRepository.create(
      createCrcRemarkSettingDto,
    );
    return this.crcRemarkSettingRepository.save(crcRemarkSetting);
  }

  async findAll(): Promise<CrcRemarkSettingEntity[]> {
    return this.crcRemarkSettingRepository.find();
  }

  async findOne(id: number): Promise<CrcRemarkSettingEntity> {
    return this.crcRemarkSettingRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.crcRemarkSettingRepository.delete(id);
  }
}
