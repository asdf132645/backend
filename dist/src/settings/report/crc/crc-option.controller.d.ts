import { CrcOptionService } from './crc-option.service';
import { CrcOption } from './entities/crc-option.entity';
export declare class CrcOptionController {
    private readonly crcOptionService;
    constructor(crcOptionService: CrcOptionService);
    findAll(): Promise<CrcOption[]>;
    findOne(id: number): Promise<CrcOption>;
    create(crcOptionData: Partial<CrcOption>): Promise<CrcOption>;
    update(crcOptionData: {
        id: number;
        crcMode?: boolean;
        crcConnect?: boolean;
    }): Promise<CrcOption>;
    delete(id: number): Promise<void>;
}
