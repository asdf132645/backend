// restore.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestoreService } from './restore.service';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { RestoreController } from './restore.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RuningInfoEntity])],
  providers: [RestoreService],
  controllers: [RestoreController],
})
export class RestoreModule {}
