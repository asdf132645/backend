import { Repository } from 'typeorm';
import { BfHotKeys } from './bfHotKeys.entity';
import { CreateBfHotKeysDto } from './dto/bfHotKeysDto';
export declare class BfHotKeysService {
    private readonly bfHotKeysRepository;
    constructor(bfHotKeysRepository: Repository<BfHotKeys>);
    create(createDto: CreateBfHotKeysDto): Promise<BfHotKeys>;
    update(updateDto: CreateBfHotKeysDto): Promise<BfHotKeys[]>;
    private updateItem;
    find(): Promise<BfHotKeys[]>;
}
