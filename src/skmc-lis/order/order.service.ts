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

      // SP_IF01Q1에서 반환된 데이터를 이용해 OrderEntity를 생성하거나 다른 로직을 수행할 수 있습니다.
      // 아래는 반환된 데이터를 기반으로 생성하는 예제입니다.
      const createdOrder = new OrderEntity();
      createdOrder.barcodeNo = result[0].barcodeNo; // 변경해야 할 필드에 따라 수정하세요.
      // 다른 필드 설정...

      // 주문을 저장합니다.
      return await this.orderRepository.save(createdOrder);
    } catch (error) {
      throw new Error('Error creating order.');
    }
  }
}
