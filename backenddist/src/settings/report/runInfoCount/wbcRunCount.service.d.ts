import { Repository } from 'typeorm';
import { WbcRunCountEntity } from './wbcRunCount.entity';
import { CreateWbcRunCountDto } from './dto/wbcRunCountDto';
export declare class WbcCountSetService {
    private readonly wbcRunCountEntityRepository;
    constructor(wbcRunCountEntityRepository: Repository<WbcRunCountEntity>);
    create(createDto: CreateWbcRunCountDto): Promise<WbcRunCountEntity>;
    update(updateDto: CreateWbcRunCountDto): Promise<WbcRunCountEntity[]>;
    private updateItem;
    find(): Promise<WbcRunCountEntity[]>;
}
