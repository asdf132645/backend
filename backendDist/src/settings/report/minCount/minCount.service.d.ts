import { Repository } from 'typeorm';
import { MinCountEntity } from './minCount.entity';
import { CreateMinCountDto } from './dto/minCountDto';
export declare class MinCountService {
    private readonly minCountEntityRepository;
    constructor(minCountEntityRepository: Repository<MinCountEntity>);
    create(createDto: CreateMinCountDto): Promise<MinCountEntity>;
    update(updateDto: CreateMinCountDto): Promise<MinCountEntity[]>;
    private updateItem;
    find(): Promise<MinCountEntity[]>;
}
