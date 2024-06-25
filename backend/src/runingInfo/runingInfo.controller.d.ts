import { RuningInfoService } from './runingInfo.service';
import { CreateRuningInfoDto, UpdateRuningInfoDto } from './dto/runingInfoDtoItems';
import { RuningInfoEntity } from './runingInfo.entity';
export declare class RuningInfoController {
    private readonly runingInfoService;
    constructor(runingInfoService: RuningInfoService);
    getPageUpDown(id: string, step: number, type: string): Promise<RuningInfoEntity | null>;
    clearPcIpAndState(oldPcIp: string): Promise<void>;
    updatePcIpAndState(oldPcIp: string, newEntityId: number, newPcIp: string): Promise<void>;
    create(createDto: CreateRuningInfoDto): Promise<RuningInfoEntity>;
    deleteMultiple(req: any): Promise<{
        success: boolean;
    }>;
    update(updateDto: UpdateRuningInfoDto): Promise<RuningInfoEntity[]>;
    getRunningInfoById(id: string): Promise<RuningInfoEntity | null>;
    findAllWithPagingAndFilter(page?: number, pageSize?: number, startDay?: string, endDay?: string, barcodeNo?: string, patientId?: string, patientNm?: string, nrCount?: string, titles?: string, testType?: string, wbcCountOrder?: string): Promise<{
        data: RuningInfoEntity[];
        total: number;
        page: number;
    }>;
}
