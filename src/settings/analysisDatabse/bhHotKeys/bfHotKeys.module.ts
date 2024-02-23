// src/wbc-hot-keys/wbc-hot-keys.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BfHotKeys } from './bfHotKeys.entity';
import { BfHotKeysService } from './bfHotKeys.service';
import { BfHotKeysController } from './bfHotKeys.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BfHotKeys])],
  providers: [BfHotKeysService],
  exports: [BfHotKeysService],
  controllers: [BfHotKeysController],
})
export class BfHotKeysModule {}
