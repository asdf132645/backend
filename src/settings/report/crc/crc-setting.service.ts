import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrcSettingEntity } from './entities/crc-setting.entity';
import {
  CreateCrcSettingDto,
  UpdateCrcSettingDto,
} from './dto/crc-setting.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class CrcSettingService {
  constructor(
    @InjectRepository(CrcSettingEntity)
    private readonly crcSettingRepository: Repository<CrcSettingEntity>,
    @InjectRedis() private readonly redis: Redis, // Redis 인스턴스 주입
  ) {}

  async create(
    createCrcSettingDtos: CreateCrcSettingDto[],
  ): Promise<CrcSettingEntity[]> {
    // DTO 배열을 각각의 CrcSettingEntity로 변환
    const crcSettings = this.crcSettingRepository.create(createCrcSettingDtos);

    // 여러 개의 엔티티를 저장하고 결과 반환
    return this.crcSettingRepository.save(crcSettings);
  }

  async update(
    crcSettingDtos: UpdateCrcSettingDto[],
  ): Promise<CrcSettingEntity[]> {
    const updatedEntities: CrcSettingEntity[] = [];

    for (const dto of crcSettingDtos) {
      const crcSetting = await this.crcSettingRepository.findOne({
        where: { id: dto.id },
      });
      if (crcSetting) {
        await this.crcSettingRepository.save(dto);
        updatedEntities.push(crcSetting);
      }

      // 업데이트된 엔티티 저장
    }
    await this.redis.flushall(); // 모든 키 삭제
    return updatedEntities;
  }

  async findAll(): Promise<CrcSettingEntity[]> {
    return this.crcSettingRepository.find();
  }

  async findOne(id: number): Promise<CrcSettingEntity> {
    return this.crcSettingRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    console.log(id);
    await this.redis.flushall(); // 모든 키 삭제
    await this.crcSettingRepository.delete(id);
  }
}
