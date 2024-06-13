import { MinCountService } from './minCount.service';
import { MinCountEntity } from './minCount.entity';
import { CreateMinCountDto } from './dto/minCountDto';
export declare class MinCountController {
    private readonly minCountService;
    constructor(minCountService: MinCountService);
    create(createDto: CreateMinCountDto): Promise<MinCountEntity>;
    update(updateDto: CreateMinCountDto): Promise<MinCountEntity[]>;
    get(): Promise<MinCountEntity[]>;
}
