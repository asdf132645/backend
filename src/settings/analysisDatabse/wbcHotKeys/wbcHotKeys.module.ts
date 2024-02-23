// src/wbc-hot-keys/wbc-hot-keys.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WbcHotKeys } from './wbcHotKeys.entity';
import { WbcHotKeysService } from './wbcHotKeys.service';
import { WbcHotKeysController } from './wbcHotKeys.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WbcHotKeys])],
  providers: [WbcHotKeysService],
  exports: [WbcHotKeysService],
  controllers: [WbcHotKeysController],
})
export class WbcHotKeysModule {}
