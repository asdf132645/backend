import { CbcCodeService } from './cbcCode.service';
import { CbcCodeEntity } from './cbcCode.entity';
import { CreateCbcCodeDto } from './dto/cbcCodeDto';
export declare class CbcCodeController {
    private readonly cbcCodeService;
    constructor(cbcCodeService: CbcCodeService);
    create(createDto: CreateCbcCodeDto): Promise<CbcCodeEntity>;
    update(updateDto: CreateCbcCodeDto): Promise<CbcCodeEntity[]>;
    get(): Promise<CbcCodeEntity[]>;
}
