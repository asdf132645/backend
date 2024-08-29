import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload.service';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { UploadController } from './upload.controller';
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
  providers: [UploadService, LoggerService],
  controllers: [UploadController],
})
export class UploadModule {}
