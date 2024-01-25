// proInfo.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessInfo } from './entities/proinfo.entity';
import { CreateProcessInfoDto } from './dto/proinfo.dto';

@Injectable()
export class ProInfoService {
  constructor(
    @InjectRepository(ProcessInfo)
    private readonly processInfoRepository: Repository<ProcessInfo>,
  ) {}

  async getAllProcessInfo(): Promise<ProcessInfo[]> {
    return await this.processInfoRepository.find();
  }

}
