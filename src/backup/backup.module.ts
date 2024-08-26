// backup.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([RuningInfoEntity]),
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    } as RedisModuleOptions),
  ],
  providers: [BackupService],
  controllers: [BackupController],
})
export class BackupModule {}
