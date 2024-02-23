// src/wbcCustomClass/wbcCustomClass.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WbcCustomClass } from './wbcCustomClass.entity';
import { WbcCustomClassService } from './wbcCustomClass.service';
import { WbcCustomClassController } from './wbcCustomClass.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WbcCustomClass])],
  providers: [WbcCustomClassService],
  controllers: [WbcCustomClassController],
})
export class WbcCustomClassModule {}
