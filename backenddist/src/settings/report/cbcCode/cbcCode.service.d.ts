import { Repository } from 'typeorm';
import { CbcCodeEntity } from './cbcCode.entity';
import { CreateCbcCodeDto } from './dto/cbcCodeDto';
export declare class CbcCodeService {
    private readonly cbcCodeEntityRepository;
    constructor(cbcCodeEntityRepository: Repository<CbcCodeEntity>);
    create(createDto: CreateCbcCodeDto): Promise<CbcCodeEntity>;
    update(updateDto: CreateCbcCodeDto): Promise<CbcCodeEntity[]>;
    private updateItem;
    find(): Promise<CbcCodeEntity[]>;
}
