import { Repository } from 'typeorm';
import { CrcSaveDataEntity } from './entities/crc_save_data.entity';
export declare class CrcSaveDataService {
    private readonly crcSaveDataRepository;
    constructor(crcSaveDataRepository: Repository<CrcSaveDataEntity>);
    findAll(): Promise<CrcSaveDataEntity[]>;
    findOneBySlotId(slotId: string): Promise<CrcSaveDataEntity>;
    create(data: Partial<CrcSaveDataEntity>): Promise<CrcSaveDataEntity>;
    updateBySlotId(slotId: string, data: Partial<CrcSaveDataEntity>): Promise<CrcSaveDataEntity>;
    deleteBySlotId(slotId: string): Promise<void>;
}
