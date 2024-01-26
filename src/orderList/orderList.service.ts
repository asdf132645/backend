// orderList.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderList } from './entities/orderList.entity';

@Injectable()
export class OrderListService {
  constructor(
    @InjectRepository(OrderList)
    private readonly orderListRepository: Repository<OrderList>,
  ) {}

  async getAllOrderList(): Promise<OrderList[]> {
    return await this.orderListRepository.find();
  }
}
