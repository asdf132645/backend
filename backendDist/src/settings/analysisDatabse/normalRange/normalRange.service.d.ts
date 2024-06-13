import { Repository } from 'typeorm';
import { NormalRange } from './normalRange.entity';
import { NormalRangeDto } from './dto/normalRangeDto';
export declare class NormalRangeService {
    private readonly normalRangeRepository;
    constructor(normalRangeRepository: Repository<NormalRange>);
    create(createDto: NormalRangeDto): Promise<NormalRange>;
    update(updateDto: NormalRangeDto): Promise<NormalRange[]>;
    private updateItem;
    find(): Promise<NormalRange[]>;
}
