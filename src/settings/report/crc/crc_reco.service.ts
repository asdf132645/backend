import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCrcRecoDto } from './dto/crc_reco.dto';
import { UpdateCrcSettingDto } from './dto/crc-setting.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { CrcRecommendationEntity } from './entities/crc_reco.entity';
@Injectable()
export class CrcRecommendationService {
  constructor(
    @InjectRepository(CrcRecommendationEntity)
    private readonly crcRecommendationEntityRepository: Repository<CrcRecommendationEntity>,
    @InjectRedis() private readonly redis: Redis, // Redis 인스턴스 주입
  ) {}

  async create(
    createCrcRecommendationSettingDto: CreateCrcRecoDto,
  ): Promise<CrcRecommendationEntity> {
    const crcRecommendationSetting =
      this.crcRecommendationEntityRepository.create(
        createCrcRecommendationSettingDto,
      );
    return this.crcRecommendationEntityRepository.save(
      crcRecommendationSetting,
    );
  }

  async findAll(): Promise<CrcRecommendationEntity[]> {
    return this.crcRecommendationEntityRepository.find();
  }

  async findOne(id: number): Promise<CrcRecommendationEntity> {
    return this.crcRecommendationEntityRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.crcRecommendationEntityRepository.delete(id);
  }

  async update(
    crcRecommendationSettingDto: any[],
  ): Promise<CrcRecommendationEntity[]> {
    const updatedEntities: CrcRecommendationEntity[] = [];

    for (const dto of crcRecommendationSettingDto) {
      const crcSetting = await this.crcRecommendationEntityRepository.findOne({
        where: { id: dto.id },
      });
      if (crcSetting) {
        await this.crcRecommendationEntityRepository.save(dto);
        updatedEntities.push(crcSetting);
      }

      // 업데이트된 엔티티 저장
    }
    // await this.redis.flushall(); // 모든 키 삭제
    return updatedEntities;
  }

  async findByCodeOrRecommendationAllContent(
    code?: string,
    remarkAllContent?: string,
  ) {
    const query = this.crcRecommendationEntityRepository.createQueryBuilder(
      'crc_recommendation_setting',
    );

    if (code) {
      query.andWhere('crc_recommendation_setting.code = :code', { code });
    }

    // remarkAllContent가 유효한 경우에만 조건 추가
    if (remarkAllContent) {
      query.andWhere(
        'crc_recommendation_setting.remarkAllContent LIKE :remarkAllContent',
        { remarkAllContent: `%${remarkAllContent}%` },
      );
    }

    return await query.getMany();
  }
}
