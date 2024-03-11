// order.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRequest } from './order-request.dto';
import { OrderEntity } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderRequest: OrderRequest): Promise<OrderEntity> {
    return this.orderService.createOrder(orderRequest);
  }
}
