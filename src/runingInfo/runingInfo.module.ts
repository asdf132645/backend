import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuningInfoEntity } from './runingInfo.entity';
import { RuningInfoService } from './runingInfo.service';
import { RuningInfoController } from './runingInfo.controller';
import { LoggerService } from '../logger.service';
import { RunningInfoResolver } from './runningInfo.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([RuningInfoEntity])],
  providers: [RuningInfoService, RunningInfoResolver, LoggerService],
  exports: [RuningInfoService, RunningInfoResolver],
  controllers: [RuningInfoController],
})
export class RuningInfoModule {}
