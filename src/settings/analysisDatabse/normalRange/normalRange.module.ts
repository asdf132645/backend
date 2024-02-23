// src/wbc-hot-keys/wbc-hot-keys.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NormalRange } from './normalRange.entity';
import { NormalRangeService } from './normalRange.service';
import { NormalRangeController } from './normalRange.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NormalRange])],
  providers: [NormalRangeService],
  exports: [NormalRangeService],
  controllers: [NormalRangeController],
})
export class NormalRangeModule {}
