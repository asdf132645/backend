import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCrcCommentDto } from './dto/crc-comment-setting.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { CrcCommentEntity } from './entities/crc-comment.entity';
@Injectable()
export class CrcCommentSettingService {
  constructor(
    @InjectRepository(CrcCommentEntity)
    private readonly CrcCommentEntityRepository: Repository<CrcCommentEntity>,
    @InjectRedis() private readonly redis: Redis, // Redis 인스턴스 주입
  ) {}

  async create(
    createCrcCommentSettingDto: CreateCrcCommentDto,
  ): Promise<CrcCommentEntity> {
    const crcCommentSetting = this.CrcCommentEntityRepository.create(
      createCrcCommentSettingDto,
    );
    return this.CrcCommentEntityRepository.save(crcCommentSetting);
  }

  async findAll(): Promise<CrcCommentEntity[]> {
    return this.CrcCommentEntityRepository.find();
  }

  async findOne(id: number): Promise<CrcCommentEntity> {
    return this.CrcCommentEntityRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.CrcCommentEntityRepository.delete(id);
  }

  async update(crcCommentSettingDto: any[]): Promise<CrcCommentEntity[]> {
    const updatedEntities: CrcCommentEntity[] = [];

    for (const dto of crcCommentSettingDto) {
      const crcSetting = await this.CrcCommentEntityRepository.findOne({
        where: { id: dto.id },
      });
      if (crcSetting) {
        await this.CrcCommentEntityRepository.save(dto);
        updatedEntities.push(crcSetting);
      }

      // 업데이트된 엔티티 저장
    }
    // await this.redis.flushall(); // 모든 키 삭제
    return updatedEntities;
  }

  async findByCodeOrCommentAllContent(
    code?: string,
    remarkAllContent?: string,
  ) {
    const query = this.CrcCommentEntityRepository.createQueryBuilder(
      'crc_comment_setting',
    );

    if (code) {
      query.andWhere('crc_comment_setting.code = :code', { code });
    }

    // remarkAllContent가 유효한 경우에만 조건 추가
    if (remarkAllContent) {
      query.andWhere(
        'crc_comment_setting.remarkAllContent LIKE :remarkAllContent',
        { remarkAllContent: `%${remarkAllContent}%` },
      );
    }

    return await query.getMany();
  }
}
