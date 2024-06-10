// backup.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { BackupDto } from './backup.dto';
import { exec } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class BackupService {
  constructor(
    @InjectRepository(RuningInfoEntity)
    private readonly runningInfoRepository: Repository<RuningInfoEntity>,
  ) {}

  async backupData(backupDto: BackupDto): Promise<void> {
    const { startDate, endDate, backupPath, sourceFolderPath } = backupDto;

    // 지정된 날짜 범위의 데이터를 조회
    const dataToBackup = await this.runningInfoRepository.find({
      where: {
        createDate: Between(startDate, endDate),
      },
    });

    // 조회된 데이터에서 slotId를 추출
    const slotIds = dataToBackup.map((item: any) => item.slotId);

    // slotId를 sourceFolderPath에 결합
    for (const slotId of slotIds) {
      const sourcePath = path.join(sourceFolderPath, slotId);
      const targetFolderPath = backupPath;

      await fs.ensureDir(targetFolderPath);

      await fs.move(sourcePath, targetFolderPath, { overwrite: true });
    }

    // 5. MySQL 데이터베이스 특정 테이블 백업
    const backupFileName = `backup-${startDate}-${endDate}.sql`;
    const sqlBackupFilePath = path.join(backupPath, backupFileName);

    const dumpCommand = `mysqldump --user=root --password=uimd5191! --host=127.0.0.1 pb_db runing_info_entity --where="createDate BETWEEN '${startDate}' AND '${endDate}'" > ${sqlBackupFilePath}`;

    exec(dumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing dump command: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`mysqldump stderr: ${stderr}`);
        return;
      }
      console.log(`Database backup saved to ${sqlBackupFilePath}`);
    });
  }
}
