import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuningInfoEntity } from './runingInfo.entity';
import { RuningInfoService } from './runingInfo.service';
import { RuningInfoController } from './runingInfo.controller';
import { LoggerService } from '../logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([RuningInfoEntity])],
  providers: [RuningInfoService, LoggerService],
  exports: [RuningInfoService],
  controllers: [RuningInfoController],
})
export class RuningInfoModule {}
