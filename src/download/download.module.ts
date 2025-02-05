import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DownloadService } from './download.service';
import { DownloadController } from './download.controller';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { LoggerService } from '../logger.service';
import { CombinedModule } from '../combinedProtocol/combined.module';

@Module({
  imports: [CombinedModule, TypeOrmModule.forFeature([RuningInfoEntity])],
  providers: [DownloadService, LoggerService],
  controllers: [DownloadController],
})
export class DownloadModule {}
