import { CrcRemarkSettingService } from './crc-remark-setting.service';
import { CreateCrcRemarkSettingDto } from './dto/crc-remark-setting.dto';
import { CrcRemarkSettingEntity } from './entities/crc-remark-setting.entity';
export declare class CrcRemarkSettingController {
    private readonly crcRemarkSettingService;
    constructor(crcRemarkSettingService: CrcRemarkSettingService);
    create(createCrcRemarkSettingDto: CreateCrcRemarkSettingDto): Promise<CrcRemarkSettingEntity>;
    findAll(): Promise<CrcRemarkSettingEntity[]>;
    findOne(id: string): Promise<CrcRemarkSettingEntity>;
    remove(id: string): Promise<void>;
    update(updateCrcSettingDtos: any[]): Promise<CrcRemarkSettingEntity[]>;
    findByCodeOrRemarkAllContent(code?: string, remarkAllContent?: string): Promise<CrcRemarkSettingEntity[]>;
}
