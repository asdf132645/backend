// backup.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { BackupDto } from './backup.dto';
import { exec } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as moment from 'moment';

@Injectable()
export class BackupService {
  constructor(
    @InjectRepository(RuningInfoEntity)
    private readonly runningInfoRepository: Repository<RuningInfoEntity>,
  ) {}

  private formatDateToString(date: Date, time): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    if (time === 'start') {
      return `${year}${month}${day}000000000`;
    } else {
      return `${year}${month}${day}999999999`;
    }
  }

  async checkIsPossibleToBackup(backupDto: BackupDto): Promise<boolean> {
    const { startDate, endDate, backupPath } = backupDto;
    // 백업 폴더가 존재하는지 확인하고 없으면 생성
    if (!(await fs.pathExists(backupPath))) {
      await fs.ensureDir(backupPath);
    }

    const dateFolder = path.join(backupPath, `${startDate}_${endDate}`);
    if (!(await fs.pathExists(dateFolder))) {
      return true;
    }
    return false;
  }

  async backupData(
    backupDto: BackupDto & { method: 'copy' | 'move' },
  ): Promise<void> {
    const { startDate, endDate, sourceFolderPath, method } = backupDto;
    // 날짜를 문자열로 변환
    const startDateObj = startDate ? moment(startDate).toDate() : undefined;
    const endDateObj = endDate ? moment(endDate).toDate() : undefined;

    const backupDriveStart = sourceFolderPath.split(':')[0];
    const projectType = sourceFolderPath.includes('PB') ? 'PB' : 'BM';
    const backupPath = backupDriveStart + ':\\' + projectType + '_backup';

    // 시작 및 종료 날짜를 YYYYMMDD 형식의 문자열로 변환
    const formattedStartDate = this.formatDateToString(startDateObj, 'start');
    const formattedEndDate = this.formatDateToString(endDateObj, 'end');
    // 백업 폴더가 존재하는지 확인하고 없으면 생성
    if (!(await fs.pathExists(backupPath))) {
      await fs.ensureDir(backupPath);
    }

    const dateFolder = path.join(backupPath, `${startDate}_${endDate}`);
    if (!(await fs.pathExists(dateFolder))) {
      await fs.ensureDir(dateFolder);
    }

    // 지정된 날짜 범위의 데이터를 조회
    const dataToBackup = await this.runningInfoRepository.find({
      where: {
        analyzedDttm: Between(formattedStartDate, formattedEndDate),
      },
    });

    // 조회된 데이터에서 slotId를 추출
    const slotIds = dataToBackup.map((item: any) => item.slotId);

    if (method === 'move') {
      const movePromises = slotIds.map((slotId) => {
        const sourcePath = path.join(sourceFolderPath, slotId);
        const targetFolderPath = path.join(dateFolder, slotId);
        return fs
          .ensureDir(targetFolderPath)
          .then(() => {
            return fs.moveSync(sourcePath, targetFolderPath, {
              overwrite: true,
            });
          })
          .catch((err) => {
            console.error(
              `Error 'moving' ${sourcePath} to ${targetFolderPath}: ${err}`,
            );
          });
      });
      await Promise.all(movePromises);
    } else {
      const movePromises = slotIds.map((slotId) => {
        const sourcePath = path.join(sourceFolderPath, slotId);
        const targetFolderPath = path.join(dateFolder, slotId);

        return fs
          .ensureDir(targetFolderPath)
          .then(() => {
            return fs.copySync(sourcePath, targetFolderPath, {
              overwrite: true,
            });
          })
          .catch((err) => {
            console.error(
              `Error copying ${sourcePath} to ${targetFolderPath}: ${err}`,
            );
          });
      });
      await Promise.all(movePromises);
    }

    // MySQL 데이터베이스 특정 테이블 백업
    const backupFileName = `backup-${startDate}_${endDate}.sql`;
    const sqlBackupFilePath = path.join(dateFolder, backupFileName);
    const databaseSchema = sourceFolderPath.includes('PB')
      ? 'pb_db_web'
      : 'bm_db_web';

    const dumpCommand = `mysqldump --user=root --password=uimd5191! --host=127.0.0.1 ${databaseSchema} runing_info_entity --where="analyzedDttm BETWEEN '${formattedStartDate}' AND '${formattedEndDate}'" > ${sqlBackupFilePath}`;

    exec(dumpCommand, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing dump command: ${error.message}`);
        return error.message;
      }
      if (stderr) {
        console.error(`mysqldump stderr: ${stderr}`);
        if (method === 'move') {
          await this.runningInfoRepository.delete({
            slotId: In(slotIds),
          });
        }
        return stderr;
      }
      if (stdout) {
        if (method === 'move') {
          await this.runningInfoRepository.delete({
            slotId: In(slotIds),
          });
        }
      }
      console.log(`Database backup saved to ${sqlBackupFilePath}`);
    });
  }
}
