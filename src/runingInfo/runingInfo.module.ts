import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuningInfoEntity } from './runingInfo.entity';
import { RuningInfoService } from './runingInfo.service';
import { RuningInfoController } from './runingInfo.controller';
import { LoggerService } from '../logger.service';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([RuningInfoEntity]),
    RedisModule.forRoot({
      type: 'single', // Redis의 단일 서버 유형을 명시합니다
      url: 'redis://localhost:6379', // Redis 연결 URL
    } as RedisModuleOptions),
  ],
  providers: [RuningInfoService, LoggerService],
  exports: [RuningInfoService],
  controllers: [RuningInfoController],
})
export class RuningInfoModule {}
