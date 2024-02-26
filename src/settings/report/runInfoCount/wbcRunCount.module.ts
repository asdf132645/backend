import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WbcRunCountEntity } from './wbcRunCount.entity';
import { WbcCountSetService } from './wbcRunCount.service';
import { WbcRunCountController } from './wbcRunCount.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WbcRunCountEntity])],
  providers: [WbcCountSetService],
  exports: [WbcCountSetService],
  controllers: [WbcRunCountController],
})
export class WbcRunCountModule {}
