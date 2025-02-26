import { AutoCbcService } from './autoCbc.service';
import { AutoCbc } from './autoCbc.entity';
import { autoCbcItems } from './dto/autoCbcDto';
export declare class AutoCbcController {
    private readonly autoCbcService;
    constructor(autoCbcService: AutoCbcService);
    findAll(): Promise<AutoCbc[]>;
    create(autoCbcData: autoCbcItems): Promise<AutoCbc>;
    update(autoCbcData: autoCbcItems): Promise<AutoCbc>;
    delete(id: number): Promise<void>;
    updateAll(autoCbcDataArray: autoCbcItems[]): Promise<AutoCbc[]>;
}
