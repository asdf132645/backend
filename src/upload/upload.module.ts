import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload.service';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { UploadController } from './upload.controller';
import { LoggerService } from '../logger.service';
import { CombinedModule } from '../combinedProtocol/combined.module';

@Module({
  imports: [CombinedModule, TypeOrmModule.forFeature([RuningInfoEntity])],
  providers: [UploadService, LoggerService],
  controllers: [UploadController],
})
export class UploadModule {}
