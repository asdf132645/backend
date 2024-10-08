import { Repository } from 'typeorm';
import { CrcSettingEntity } from './entities/crc-setting.entity';
import { CreateCrcSettingDto, UpdateCrcSettingDto } from './dto/crc-setting.dto';
import Redis from 'ioredis';
export declare class CrcSettingService {
    private readonly crcSettingRepository;
    private readonly redis;
    constructor(crcSettingRepository: Repository<CrcSettingEntity>, redis: Redis);
    create(createCrcSettingDtos: CreateCrcSettingDto[]): Promise<CrcSettingEntity[]>;
    update(crcSettingDtos: UpdateCrcSettingDto[]): Promise<CrcSettingEntity[]>;
    findAll(): Promise<CrcSettingEntity[]>;
    findOne(id: number): Promise<CrcSettingEntity>;
    remove(id: number): Promise<void>;
}
