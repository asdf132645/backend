import { Repository } from 'typeorm';
import { AutoCbc } from './autoCbc.entity';
import { autoCbcItems } from './dto/autoCbcDto';
export declare class AutoCbcService {
    private autoCbcRepository;
    constructor(autoCbcRepository: Repository<AutoCbc>);
    findAll(): Promise<AutoCbc[]>;
    findOne(id: number): Promise<AutoCbc>;
    create(autoCbcData: autoCbcItems): Promise<AutoCbc>;
    update(id: number, autoCbcData: autoCbcItems): Promise<AutoCbc>;
    delete(id: number): Promise<void>;
    updateAll(autoCbcDataArray: autoCbcItems[]): Promise<AutoCbc[]>;
}
