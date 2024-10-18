import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrcOption } from './entities/crc-option.entity';

@Injectable()
export class CrcOptionService {
  constructor(
    @InjectRepository(CrcOption)
    private readonly crcOptionRepository: Repository<CrcOption>,
  ) {}

  // 모든 옵션 가져오기
  async findAll(): Promise<CrcOption[]> {
    return this.crcOptionRepository.find();
  }

  // 특정 옵션 가져오기 (ID로)
  async findOne(id: number): Promise<CrcOption> {
    return this.crcOptionRepository.findOneBy({ id });
  }

  // 옵션 생성
  async create(crcOptionData: Partial<CrcOption>): Promise<CrcOption> {
    const newCrcOption = this.crcOptionRepository.create(crcOptionData);
    return this.crcOptionRepository.save(newCrcOption);
  }

  // 옵션 업데이트
  async update(
    crcOptionData: { id: number; crcMode?: boolean; crcConnect?: boolean }, // id를 body에서 받도록 수정
  ): Promise<CrcOption> {
    const { id, ...updateData } = crcOptionData; // id를 분리하고 나머지 업데이트할 데이터를 추출
    await this.crcOptionRepository.update(id, updateData);
    return this.findOne(id); // 업데이트 후 결과 반환
  }

  // 옵션 삭제
  async delete(id: number): Promise<void> {
    await this.crcOptionRepository.delete(id);
  }
}
