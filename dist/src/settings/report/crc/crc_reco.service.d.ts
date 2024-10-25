import { Repository } from 'typeorm';
import { CreateCrcRecoDto } from './dto/crc_reco.dto';
import Redis from 'ioredis';
import { CrcRecommendationEntity } from './entities/crc_reco.entity';
export declare class CrcRecommendationService {
    private readonly crcRecommendationEntityRepository;
    private readonly redis;
    constructor(crcRecommendationEntityRepository: Repository<CrcRecommendationEntity>, redis: Redis);
    create(createCrcRecommendationSettingDto: CreateCrcRecoDto): Promise<CrcRecommendationEntity>;
    findAll(): Promise<CrcRecommendationEntity[]>;
    findOne(id: number): Promise<CrcRecommendationEntity>;
    remove(id: number): Promise<void>;
    update(crcRecommendationSettingDto: any[]): Promise<CrcRecommendationEntity[]>;
    findByCodeOrRecommendationAllContent(code?: string, remarkAllContent?: string): Promise<CrcRecommendationEntity[]>;
}
