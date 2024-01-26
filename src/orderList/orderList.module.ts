// orderList.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderListController } from './orderList.controller';
import { OrderListService } from './orderList.service';
import { OrderList } from './entities/orderList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderList])],
  controllers: [OrderListController],
  providers: [OrderListService],
})
export class OrderListModule {}
