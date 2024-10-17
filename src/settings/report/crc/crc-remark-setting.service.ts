import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrcRemarkSettingEntity } from './entities/crc-remark-setting.entity';
import { CreateCrcRemarkSettingDto } from './dto/crc-remark-setting.dto';
import { UpdateCrcSettingDto } from './dto/crc-setting.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
@Injectable()
export class CrcRemarkSettingService {
  constructor(
    @InjectRepository(CrcRemarkSettingEntity)
    private readonly crcRemarkSettingRepository: Repository<CrcRemarkSettingEntity>,
    @InjectRedis() private readonly redis: Redis, // Redis 인스턴스 주입
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

  async update(
    crcSettingDtos: UpdateCrcSettingDto[],
  ): Promise<CrcRemarkSettingEntity[]> {
    const updatedEntities: CrcRemarkSettingEntity[] = [];

    for (const dto of crcSettingDtos) {
      const crcSetting = await this.crcRemarkSettingRepository.findOne({
        where: { id: dto.id },
      });
      if (crcSetting) {
        await this.crcRemarkSettingRepository.save(dto);
        updatedEntities.push(crcSetting);
      }

      // 업데이트된 엔티티 저장
    }
    await this.redis.flushall(); // 모든 키 삭제
    return updatedEntities;
  }

  async findByCodeOrRemarkAllContent(
    code?: string,
    remarkAllContent?: string,
  ): Promise<CrcRemarkSettingEntity[]> {
    const whereCondition: any = {};

    if (code) {
      whereCondition.code = code;
    }

    if (remarkAllContent) {
      whereCondition.remarkAllContent = remarkAllContent;
    }

    return this.crcRemarkSettingRepository.find({
      where: whereCondition,
    });
  }
}
