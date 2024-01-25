// proInfo.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProInfoController } from './proInfo.controller';
import { ProInfoService } from './proInfo.service';
import { ProcessInfo } from './entities/proinfo.entity'; // 경로는 실제 파일 위치에 맞게 수정

@Module({
  imports: [TypeOrmModule.forFeature([ProcessInfo])],
  controllers: [ProInfoController],
  providers: [ProInfoService],
})
export class ProInfoModule {}
