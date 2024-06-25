import { Repository } from 'typeorm';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { BackupDto } from './backup.dto';
export declare class BackupService {
    private readonly runningInfoRepository;
    constructor(runningInfoRepository: Repository<RuningInfoEntity>);
    private formatDateToString;
    backupData(backupDto: BackupDto): Promise<void>;
}
