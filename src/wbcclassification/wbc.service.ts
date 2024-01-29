// wbc.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WBCClassification } from './entities/wbc-classification.entity';

@Injectable()
export class WBCService {
  constructor(
    @InjectRepository(WBCClassification)
    private readonly wbcRepository: Repository<WBCClassification>,
  ) {}

  async findAll(): Promise<WBCClassification[]> {
    return this.wbcRepository.find();
  }
}
