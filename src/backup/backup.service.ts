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

  private formatDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}000000000`;
  }

  async backupData(backupDto: BackupDto): Promise<void> {
    const { startDate, endDate, backupPath, sourceFolderPath } = backupDto;
    // 날짜를 문자열로 변환
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // 시작 및 종료 날짜를 YYYYMMDD 형식의 문자열로 변환
    const formattedStartDate = this.formatDateToString(startDateObj);
    const formattedEndDate = this.formatDateToString(endDateObj);
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
        createDate: Between(formattedStartDate, formattedEndDate),
      },
    });

    // 조회된 데이터에서 slotId를 추출
    const slotIds = dataToBackup.map((item: any) => item.slotId);
    // slotId를 sourceFolderPath에 결합
    for (const slotId of slotIds) {
      const sourcePath = path.join(sourceFolderPath, slotId);
      const targetFolderPath = path.join(dateFolder, slotId); // 변경된 부분

      // 대상 폴더가 존재하지 않으면 생성
      if (!(await fs.pathExists(targetFolderPath))) {
        await fs.ensureDir(targetFolderPath);
      }

      // 대상 폴더가 존재할 때만 이동 수행
      await fs
        .move(sourcePath, targetFolderPath, { overwrite: true })
        .catch((err) => {
          console.error(
            `Error moving ${sourcePath} to ${targetFolderPath}: ${err}`,
          );
        });
    }

    await Promise.all(
      dataToBackup.map(async (item: any) => {
        item.rootPath = dateFolder;
        await this.runningInfoRepository.save(item);
      }),
    );

    // MySQL 데이터베이스 특정 테이블 백업
    const backupFileName = `backup-${startDate}-${endDate}.sql`;
    const sqlBackupFilePath = path.join(dateFolder, backupFileName);

    const dumpCommand = `mysqldump --user=root --password=uimd5191! --host=127.0.0.1 pb_db runing_info_entity --where="createDate BETWEEN '${startDate}' AND '${endDate}'" > ${sqlBackupFilePath}`;

    exec(dumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing dump command: ${error.message}`);
        return error.message;
      }
      if (stderr) {
        console.error(`mysqldump stderr: ${stderr}`);
        return stderr;
      }
      console.log(`Database backup saved to ${sqlBackupFilePath}`);
    });
  }
}
