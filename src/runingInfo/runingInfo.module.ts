import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuningInfoEntity } from './runingInfo.entity';
import { RuningInfoService } from './runingInfo.service';
import { RuningInfoController } from './runingInfo.controller';
import { LoggerService } from '../logger.service';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';
import { RunningInfoResolver } from './runningInfo.resolver';
import { redisSettings } from '../cache/cache.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([RuningInfoEntity]),
    RedisModule.forRoot(redisSettings as RedisModuleOptions),
  ],
  providers: [RuningInfoService, RunningInfoResolver, LoggerService],
  exports: [RuningInfoService, RunningInfoResolver],
  controllers: [RuningInfoController],
})
export class RuningInfoModule {}
