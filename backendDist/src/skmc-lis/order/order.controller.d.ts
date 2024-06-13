import { OrderService } from './order.service';
import { OrderRequest } from './order-request.dto';
import { OrderEntity } from './order.entity';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(orderRequest: OrderRequest): Promise<OrderEntity>;
}
