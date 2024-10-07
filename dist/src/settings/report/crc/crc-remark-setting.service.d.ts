import { Repository } from 'typeorm';
import { CrcRemarkSettingEntity } from './entities/crc-remark-setting.entity';
import { CreateCrcRemarkSettingDto } from './dto/crc-remark-setting.dto';
export declare class CrcRemarkSettingService {
    private readonly crcRemarkSettingRepository;
    constructor(crcRemarkSettingRepository: Repository<CrcRemarkSettingEntity>);
    create(createCrcRemarkSettingDto: CreateCrcRemarkSettingDto): Promise<CrcRemarkSettingEntity>;
    findAll(): Promise<CrcRemarkSettingEntity[]>;
    findOne(id: number): Promise<CrcRemarkSettingEntity>;
    remove(id: number): Promise<void>;
}
