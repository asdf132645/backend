import { BfHotKeysService } from './bfHotKeys.service';
import { BfHotKeys } from './bfHotKeys.entity';
import { CreateBfHotKeysDto } from './dto/bfHotKeysDto';
export declare class BfHotKeysController {
    private readonly bfHotKeysService;
    constructor(bfHotKeysService: BfHotKeysService);
    create(createDto: CreateBfHotKeysDto): Promise<BfHotKeys>;
    update(updateDto: CreateBfHotKeysDto): Promise<BfHotKeys[]>;
    findByUserId(): Promise<BfHotKeys[]>;
}
