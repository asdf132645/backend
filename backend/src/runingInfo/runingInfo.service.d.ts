import { Repository } from 'typeorm';
import { RuningInfoEntity } from './runingInfo.entity';
import { CreateRuningInfoDto, UpdateRuningInfoDto } from './dto/runingInfoDtoItems';
export declare class RuningInfoService {
    private readonly runingInfoEntityRepository;
    constructor(runingInfoEntityRepository: Repository<RuningInfoEntity>);
    create(createDto: CreateRuningInfoDto): Promise<RuningInfoEntity>;
    update(updateDto: UpdateRuningInfoDto): Promise<RuningInfoEntity[]>;
    delete(ids: string[], rootPaths: string[]): Promise<boolean>;
    private deleteFolderRecursive;
    findAllWithPagingAndFilter(page: number, pageSize: number, startDay?: Date, endDay?: Date, barcodeNo?: string, patientId?: string, patientNm?: string, nrCount?: string, titles?: string[], testType?: string, wbcCountOrder?: string): Promise<{
        data: RuningInfoEntity[];
        total: number;
    }>;
    clearPcIpAndSetStateFalse(pcIp: string): Promise<void>;
    getRunningInfoById(id: number): Promise<RuningInfoEntity | null>;
    getUpDownRunnInfo(id: number, step: number, type: string): Promise<RuningInfoEntity | null>;
    updatePcIpAndState(oldPcIp: string, newEntityId: number, newPcIp: string): Promise<void>;
    clearPcIpAndState(oldPcIp: string): Promise<void>;
}
