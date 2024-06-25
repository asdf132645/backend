import { Repository } from 'typeorm';
import { LisCodeWbcEntity } from './lisCodeWbc.entity';
import { CreateLisCodeDto } from './dto/lisCodeWbcDto';
export declare class LisCodeWbcService {
    private readonly lisCodeEntityRepository;
    constructor(lisCodeEntityRepository: Repository<LisCodeWbcEntity>);
    create(createDto: CreateLisCodeDto): Promise<LisCodeWbcEntity>;
    update(updateDto: CreateLisCodeDto): Promise<LisCodeWbcEntity[]>;
    private updateItem;
    find(): Promise<LisCodeWbcEntity[]>;
}
