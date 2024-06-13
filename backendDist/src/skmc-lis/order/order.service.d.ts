import { Repository } from 'typeorm';
import { OrderRequest } from './order-request.dto';
import { OrderEntity } from './order.entity';
export declare class OrderService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<OrderEntity>);
    createOrder(orderRequest: OrderRequest): Promise<OrderEntity>;
}
