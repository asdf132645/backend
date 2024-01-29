// rbc.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RBCClassification } from './entities/rbcclassification.entity';

@Injectable()
export class RBCService {
  constructor(
    @InjectRepository(RBCClassification)
    private readonly rbcRepository: Repository<RBCClassification>,
  ) {}

  async findAll(): Promise<RBCClassification[]> {
    return this.rbcRepository.find();
  }
}
