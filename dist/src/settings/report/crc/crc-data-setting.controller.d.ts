import { CrcDataSettingService } from './crc-data-setting.service';
import { CreateCrcDataSettingDto } from './dto/crc-data-setting.dto';
export declare class CrcDataSettingController {
    private readonly crcDataSettingService;
    constructor(crcDataSettingService: CrcDataSettingService);
    create(createCrcDataSettingDto: CreateCrcDataSettingDto): Promise<import("./entities/crc-data-setting.entity").CrcDataSettingEntity>;
    findAll(): Promise<import("./entities/crc-data-setting.entity").CrcDataSettingEntity[]>;
    findOne(id: string): Promise<import("./entities/crc-data-setting.entity").CrcDataSettingEntity>;
    remove(id: string): Promise<void>;
}
