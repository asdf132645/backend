import { Repository } from 'typeorm';
import { WbcHotKeys } from './wbcHotKeys.entity';
import { CreateWbcHotKeysDto } from './dto/wbcHotKeys.dto';
export declare class WbcHotKeysService {
    private readonly wbcHotKeysRepository;
    constructor(wbcHotKeysRepository: Repository<WbcHotKeys>);
    create(createDto: CreateWbcHotKeysDto): Promise<WbcHotKeys>;
    update(updateDto: CreateWbcHotKeysDto): Promise<WbcHotKeys[]>;
    private updateItem;
    find(): Promise<WbcHotKeys[]>;
}
