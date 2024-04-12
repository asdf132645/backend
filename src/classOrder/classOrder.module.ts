import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassOrderService } from './classOrder.service';
import { ClassOrderController } from './classOrder.controller';
import { ClassOrderEntity } from './classOrder.entity'; // ClassOrderEntity import 추가

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassOrderEntity]), // ClassOrderEntity를 TypeOrmModule에 추가
  ],
  controllers: [ClassOrderController],
  providers: [ClassOrderService],
})
export class ClassOrderModule {}
