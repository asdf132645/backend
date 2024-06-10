// backup.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RuningInfoEntity])],
  providers: [BackupService],
  controllers: [BackupController],
})
export class BackupModule {}
