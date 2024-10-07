import { Repository } from 'typeorm';
import { CrcSettingEntity } from './entities/crc-setting.entity';
import { CreateCrcSettingDto } from './dto/crc-setting.dto';
export declare class CrcSettingService {
    private readonly crcSettingRepository;
    constructor(crcSettingRepository: Repository<CrcSettingEntity>);
    create(createCrcSettingDto: CreateCrcSettingDto): Promise<CrcSettingEntity>;
    findAll(): Promise<CrcSettingEntity[]>;
    findOne(id: number): Promise<CrcSettingEntity>;
    remove(id: number): Promise<void>;
}
