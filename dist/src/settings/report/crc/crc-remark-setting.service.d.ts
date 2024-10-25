import { Repository } from 'typeorm';
import { CrcRemarkSettingEntity } from './entities/crc-remark-setting.entity';
import { CreateCrcRemarkSettingDto } from './dto/crc-remark-setting.dto';
import { UpdateCrcSettingDto } from './dto/crc-setting.dto';
import Redis from 'ioredis';
export declare class CrcRemarkSettingService {
    private readonly crcRemarkSettingRepository;
    private readonly redis;
    constructor(crcRemarkSettingRepository: Repository<CrcRemarkSettingEntity>, redis: Redis);
    create(createCrcRemarkSettingDto: CreateCrcRemarkSettingDto): Promise<CrcRemarkSettingEntity>;
    findAll(): Promise<CrcRemarkSettingEntity[]>;
    findOne(id: number): Promise<CrcRemarkSettingEntity>;
    remove(id: number): Promise<void>;
    update(crcSettingDtos: UpdateCrcSettingDto[]): Promise<CrcRemarkSettingEntity[]>;
    findByCodeOrRemarkAllContent(code?: string, remarkAllContent?: string): Promise<CrcRemarkSettingEntity[]>;
}
