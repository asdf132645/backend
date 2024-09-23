import { RuningInfoService } from './runingInfo.service';
import { RuningInfoEntity } from './runingInfo.entity';
import { CreateRuningInfoDto } from './dto/runingInfoDtoItems';
export declare class RuningInfoResolver {
    private readonly runningInfoService;
    constructor(runningInfoService: RuningInfoService);
    createRunningInfo(createRunningInfoDto: CreateRuningInfoDto): Promise<RuningInfoEntity>;
    getRunningInfoById(id: number): Promise<RuningInfoEntity | null>;
}
