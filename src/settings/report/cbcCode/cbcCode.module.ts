// src/wbc-hot-keys/wbc-hot-keys.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CbcCodeEntity } from './cbcCode.entity';
import { CbcCodeService } from './cbcCode.service';
import { CbcCodeController } from './cbcCode.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CbcCodeEntity])],
  providers: [CbcCodeService],
  exports: [CbcCodeService],
  controllers: [CbcCodeController],
})
export class CbcCodeModule {}
