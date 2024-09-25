import { RuningInfoService } from './runingInfo.service';
import { RuningInfoEntity } from './runingInfo.entity';
export declare class RunningInfoResolver {
    private readonly runningInfoService;
    constructor(runningInfoService: RuningInfoService);
    getRunningInfoByIdGQL(id: number): Promise<RuningInfoEntity>;
}
