// order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRequest } from './order-request.dto';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async createOrder(orderRequest: OrderRequest): Promise<OrderEntity> {
    try {
      const result = await this.orderRepository.query(`
        CALL IFDBLIB.SP_IF01Q1(
          '${orderRequest.barcodeNo}', 
          '${orderRequest.resultCd}'
        )
      `);

      const createdOrder = new OrderEntity();
      createdOrder.barcodeNo = result[0].barcodeNo;
      // 다른 필드 설정...

      return await this.orderRepository.save(createdOrder);
    } catch (error) {
      throw new Error('Error creating order.');
    }
  }
}
