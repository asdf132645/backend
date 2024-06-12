import { RuningInfoService } from './runingInfo.service';
import { CreateRuningInfoDto, UpdateRuningInfoDto } from './dto/runingInfoDtoItems';
import { RuningInfoEntity } from './runingInfo.entity';
export declare class RuningInfoController {
    private readonly runingInfoService;
    constructor(runingInfoService: RuningInfoService);
    create(createDto: CreateRuningInfoDto): Promise<RuningInfoEntity>;
    deleteMultiple(ids: string[]): Promise<{
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
