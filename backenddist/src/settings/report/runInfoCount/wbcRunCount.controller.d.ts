import { WbcCountSetService } from './wbcRunCount.service';
import { WbcRunCountEntity } from './wbcRunCount.entity';
import { CreateWbcRunCountDto } from './dto/wbcRunCountDto';
export declare class WbcRunCountController {
    private readonly wbcCountSetService;
    constructor(wbcCountSetService: WbcCountSetService);
    create(createDto: CreateWbcRunCountDto): Promise<WbcRunCountEntity>;
    update(updateDto: CreateWbcRunCountDto): Promise<WbcRunCountEntity[]>;
    find(): Promise<WbcRunCountEntity[]>;
}
