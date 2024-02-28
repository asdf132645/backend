import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuningInfoEntity } from './runingInfo.entity';
import { RuningInfoService } from './runingInfo.service';
import { RuningInfoController } from './runingInfo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RuningInfoEntity])],
  providers: [RuningInfoService],
  exports: [RuningInfoService],
  controllers: [RuningInfoController],
})
export class RuningInfoModule {}
