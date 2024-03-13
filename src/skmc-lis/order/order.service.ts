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
      // 주문을 생성하기 위해 SP_IF01Q1 저장 프로시저를 호출합니다.
      const result = await this.orderRepository.query(`
        CALL IFDBLIB.SP_IF01Q1(
          '${orderRequest.barcodeNo}', 
          '${orderRequest.resultCd}'
        )
      `);

      // SP_IF01Q1에서 반환된 데이터를 이용해 OrderEntity를 생성
      const createdOrder = new OrderEntity();
      createdOrder.barcodeNo = result[0].barcodeNo;
      // 다른 필드 설정...

      // 주문을 저장합니다.
      return await this.orderRepository.save(createdOrder);
    } catch (error) {
      throw new Error('Error creating order.');
    }
  }
}
