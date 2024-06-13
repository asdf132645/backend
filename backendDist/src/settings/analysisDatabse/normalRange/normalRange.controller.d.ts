import { NormalRangeService } from './normalRange.service';
import { NormalRange } from './normalRange.entity';
import { NormalRangeDto } from './dto/normalRangeDto';
export declare class NormalRangeController {
    private readonly normalRangeService;
    constructor(normalRangeService: NormalRangeService);
    create(createDto: NormalRangeDto): Promise<NormalRange>;
    update(updateDto: NormalRangeDto): Promise<NormalRange[]>;
    find(): Promise<NormalRange[]>;
}
