// rbc.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RBCService } from './rbc.service';
import { RBCController } from './rbc.controller';
import { RBCClassification } from './entities/rbc_classification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RBCClassification])],
  providers: [RBCService],
  controllers: [RBCController],
})
export class RBCModule {}
