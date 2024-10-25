import { Repository } from 'typeorm';
import { CrcOption } from './entities/crc-option.entity';
export declare class CrcOptionService {
    private readonly crcOptionRepository;
    constructor(crcOptionRepository: Repository<CrcOption>);
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
