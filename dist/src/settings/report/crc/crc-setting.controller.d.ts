import { CrcSettingService } from './crc-setting.service';
import { CreateCrcSettingDto, UpdateCrcSettingDto } from './dto/crc-setting.dto';
export declare class CrcSettingController {
    private readonly crcSettingService;
    constructor(crcSettingService: CrcSettingService);
    create(createCrcSettingDto: CreateCrcSettingDto[]): Promise<import("./entities/crc-setting.entity").CrcSettingEntity[]>;
    findAll(): Promise<import("./entities/crc-setting.entity").CrcSettingEntity[]>;
    update(updateCrcSettingDtos: UpdateCrcSettingDto[]): Promise<import("./entities/crc-setting.entity").CrcSettingEntity[]>;
    findOne(id: string): Promise<import("./entities/crc-setting.entity").CrcSettingEntity>;
    remove(id: string): Promise<void>;
}
