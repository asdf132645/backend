import { CrcRecommendationService } from './crc_reco.service';
import { CreateCrcRecoDto } from './dto/crc_reco.dto';
export declare class CrcRecommendationSettingController {
    private readonly crcRecommendationSettingService;
    constructor(crcRecommendationSettingService: CrcRecommendationService);
    create(createCrcRecommendationDto: CreateCrcRecoDto): Promise<import("./entities/crc_reco.entity").CrcRecommendationEntity>;
    findAll(): Promise<import("./entities/crc_reco.entity").CrcRecommendationEntity[]>;
    find(code?: string, RecommendationAllContent?: string): Promise<import("./entities/crc_reco.entity").CrcRecommendationEntity[]>;
    findOne(id: string): Promise<import("./entities/crc_reco.entity").CrcRecommendationEntity>;
    remove(id: string): Promise<void>;
    update(updateCrcSettingDtos: any[]): Promise<import("./entities/crc_reco.entity").CrcRecommendationEntity[]>;
}
