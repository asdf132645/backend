import { WbcHotKeysService } from './wbcHotKeys.service';
import { WbcHotKeys } from './wbcHotKeys.entity';
import { CreateWbcHotKeysDto } from './dto/wbcHotKeys.dto';
export declare class WbcHotKeysController {
    private readonly wbcHotKeysService;
    constructor(wbcHotKeysService: WbcHotKeysService);
    create(createDto: CreateWbcHotKeysDto): Promise<WbcHotKeys>;
    update(updateDto: CreateWbcHotKeysDto): Promise<WbcHotKeys[]>;
    find(): Promise<WbcHotKeys[]>;
}
