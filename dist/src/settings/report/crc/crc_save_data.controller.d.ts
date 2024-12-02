import { CrcSaveDataService } from './crc_save_data.service';
import { CrcSaveDataEntity } from './entities/crc_save_data.entity';
export declare class CrcSaveDataController {
    private readonly crcSaveDataService;
    constructor(crcSaveDataService: CrcSaveDataService);
    findAll(): Promise<CrcSaveDataEntity[]>;
    findOne(slotId: string): Promise<CrcSaveDataEntity | []>;
    create(data: Partial<CrcSaveDataEntity>): Promise<CrcSaveDataEntity>;
    update(data: Partial<CrcSaveDataEntity>): Promise<CrcSaveDataEntity>;
    delete(data: Partial<CrcSaveDataEntity>): Promise<void>;
}
