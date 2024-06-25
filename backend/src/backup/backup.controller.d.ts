import { BackupService } from './backup.service';
import { BackupDto } from './backup.dto';
export declare class BackupController {
    private readonly backupService;
    constructor(backupService: BackupService);
    createBackup(backupDto: BackupDto): Promise<void>;
}
