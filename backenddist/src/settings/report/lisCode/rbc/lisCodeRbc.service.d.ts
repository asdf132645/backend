import { Repository } from 'typeorm';
import { LisCodeRbcEntity } from './lisCodeRbc.entity';
import { CreateLisCodeRbcDto } from './dto/lisCodeRbcDto';
export declare class LisCodeRbcService {
    private readonly lisCodeRbcEntityRepository;
    constructor(lisCodeRbcEntityRepository: Repository<LisCodeRbcEntity>);
    create(createDto: CreateLisCodeRbcDto): Promise<LisCodeRbcEntity>;
    update(updateDto: CreateLisCodeRbcDto): Promise<LisCodeRbcEntity[]>;
    private updateItem;
    find(): Promise<LisCodeRbcEntity[]>;
}
