// orderList.controller.ts

import { Controller, Get } from '@nestjs/common';
import { OrderListService } from './orderList.service';
import { OrderList } from './entities/orderList.entity';

@Controller('orderList')
export class OrderListController {
  constructor(private readonly orderListService: OrderListService) {}

  @Get('/getAllOrderList')
  async getAllOrderList(): Promise<OrderList[]> {
    return await this.orderListService.getAllOrderList();
  }
}
