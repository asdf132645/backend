import { ClassOrderDto } from './dto/classOrder.dto';
import { ClassOrderService } from './classOrder.service';
export declare class ClassOrderController {
    private readonly classOrderService;
    constructor(classOrderService: ClassOrderService);
    getClassOrdersByUserName(): Promise<ClassOrderDto[]>;
    createClassOrders(createDtos: any[]): Promise<any[]>;
    updateAllClassOrders(newData: ClassOrderDto[]): Promise<ClassOrderDto[]>;
}
