// restore.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestoreService } from './restore.service';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { RestoreController } from './restore.controller';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';
import { LoggerService } from '../logger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RuningInfoEntity]),
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    } as RedisModuleOptions),
  ],
  providers: [RestoreService, LoggerService],
  controllers: [RestoreController],
})
export class RestoreModule {}
