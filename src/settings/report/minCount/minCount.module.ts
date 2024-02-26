import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinCountEntity } from './minCount.entity';
import { MinCountService } from './minCount.service';
import { MinCountController } from './minCount.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MinCountEntity])],
  providers: [MinCountService],
  exports: [MinCountService],
  controllers: [MinCountController],
})
export class MinCountModule {}
