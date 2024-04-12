import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassOrderService } from './classOrder.service';
import { ClassOrderController } from './classOrder.controller';
import { ClassOrder } from './classOrder'; // ClassOrderEntity import 추가

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassOrder]), // ClassOrderEntity를 TypeOrmModule에 추가
  ],
  controllers: [ClassOrderController],
  providers: [ClassOrderService],
})
export class ClassOrderModule {}
