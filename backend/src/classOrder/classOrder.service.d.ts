import { Repository } from 'typeorm';
import { ClassOrder } from './classOrder';
import { ClassOrderDto } from './dto/classOrder.dto';
export declare class ClassOrderService {
    private classOrderRepository;
    constructor(classOrderRepository: Repository<ClassOrder>);
    getClassOrders(): Promise<ClassOrderDto[]>;
    createClassOrder(createDtos: ClassOrderDto[]): Promise<ClassOrderDto[]>;
    updateClassOrders(newData: ClassOrderDto[]): Promise<ClassOrderDto[]>;
    private entityToDto;
    private dtoToEntity;
}
