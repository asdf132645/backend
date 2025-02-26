import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutoCbc } from './autoCbc.entity';
import { autoCbcItems } from './dto/autoCbcDto';

@Injectable()
export class AutoCbcService {
  constructor(
    @InjectRepository(AutoCbc)
    private autoCbcRepository: Repository<AutoCbc>,
  ) {}

  async findAll(): Promise<AutoCbc[]> {
    return this.autoCbcRepository.find({ cache: false });
  }

  async findOne(id: number): Promise<AutoCbc> {
    return this.autoCbcRepository.findOne({ where: { id } });
  }

  async create(autoCbcData: autoCbcItems): Promise<AutoCbc> {
    const newAutoCbc = this.autoCbcRepository.create(autoCbcData);
    return this.autoCbcRepository.save(newAutoCbc);
  }

  async update(id: number, autoCbcData: autoCbcItems): Promise<AutoCbc> {
    await this.autoCbcRepository.update(id, autoCbcData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.autoCbcRepository.delete(id);
  }

  // 전체 배열을 업데이트하는 메서드
  async updateAll(autoCbcDataArray: autoCbcItems[]): Promise<AutoCbc[]> {
    // 1. 기존 데이터 삭제
    await this.autoCbcRepository.clear(); // 테이블의 모든 데이터 삭제

    // 2. 새로운 데이터 삽입
    const dataWithOrder = autoCbcDataArray.map((item, index) => ({
      ...item,
      orderIdx: (index + 1).toString(), // 숫자를 문자열로 변환하여 설정
    }));

    // 3. 삽입 (순서대로)
    await this.autoCbcRepository.save(dataWithOrder);

    // 4. 순서대로 데이터를 다시 가져와서 반환
    return this.autoCbcRepository.find({ order: { orderIdx: 'ASC' } });
  }
}
