// wbc.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WBCService } from './wbc.service';
import { WBCController } from './wbc.controller';
import { WBCClassification } from './entities/wbc-classification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WBCClassification])],
  providers: [WBCService],
  controllers: [WBCController],
})
export class WBCModule {}
