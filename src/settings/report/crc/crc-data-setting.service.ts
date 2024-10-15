import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrcDataSettingEntity } from './entities/crc-data-setting.entity';
import { CreateCrcDataSettingDto } from './dto/crc-data-setting.dto';
import { UpdateCrcSettingDto } from './dto/crc-setting.dto';
import { CrcRemarkSettingEntity } from './entities/crc-remark-setting.entity';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class CrcDataSettingService {
  constructor(
    @InjectRepository(CrcDataSettingEntity)
    private readonly crcDataSettingRepository: Repository<CrcDataSettingEntity>,
    @InjectRedis() private readonly redis: Redis, // Redis 인스턴스 주입
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

  async update(crcSettingDtos: any[]): Promise<any[]> {
    const updatedEntities: any[] = [];

    for (const dto of crcSettingDtos) {
      const crcSetting = await this.crcDataSettingRepository.findOne({
        where: { id: dto.id },
      });
      if (crcSetting) {
        await this.crcDataSettingRepository.save(dto);
        updatedEntities.push(crcSetting);
      }

      // 업데이트된 엔티티 저장
    }
    await this.redis.flushall(); // 모든 키 삭제
    return updatedEntities;
  }
}
