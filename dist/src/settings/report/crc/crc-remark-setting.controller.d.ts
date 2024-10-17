import { CrcRemarkSettingService } from './crc-remark-setting.service';
import { CreateCrcRemarkSettingDto } from './dto/crc-remark-setting.dto';
export declare class CrcRemarkSettingController {
    private readonly crcRemarkSettingService;
    constructor(crcRemarkSettingService: CrcRemarkSettingService);
    create(createCrcRemarkSettingDto: CreateCrcRemarkSettingDto): Promise<import("./entities/crc-remark-setting.entity").CrcRemarkSettingEntity>;
    findAll(): Promise<import("./entities/crc-remark-setting.entity").CrcRemarkSettingEntity[]>;
    find(code?: string, remarkAllContent?: string): Promise<import("./entities/crc-remark-setting.entity").CrcRemarkSettingEntity[]>;
    findOne(id: string): Promise<import("./entities/crc-remark-setting.entity").CrcRemarkSettingEntity>;
    remove(id: string): Promise<void>;
    update(updateCrcSettingDtos: any[]): Promise<import("./entities/crc-remark-setting.entity").CrcRemarkSettingEntity[]>;
}
