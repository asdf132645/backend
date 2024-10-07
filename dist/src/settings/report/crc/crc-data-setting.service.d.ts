import { Repository } from 'typeorm';
import { CrcDataSettingEntity } from './entities/crc-data-setting.entity';
import { CreateCrcDataSettingDto } from './dto/crc-data-setting.dto';
export declare class CrcDataSettingService {
    private readonly crcDataSettingRepository;
    constructor(crcDataSettingRepository: Repository<CrcDataSettingEntity>);
    create(createCrcDataSettingDto: CreateCrcDataSettingDto): Promise<CrcDataSettingEntity>;
    findAll(): Promise<CrcDataSettingEntity[]>;
    findOne(id: number): Promise<CrcDataSettingEntity>;
    remove(id: number): Promise<void>;
}
