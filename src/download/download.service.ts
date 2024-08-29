// download.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { DownloadDto, DownloadReturn } from './download.dto';
import { exec } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as moment from 'moment';

@Injectable()
export class DownloadService {
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

  async checkIsPossibleToDownload(
    downloadDto: DownloadDto,
  ): Promise<DownloadReturn> {
    const { startDate, endDate, destinationDownloadPath, originDownloadPath } =
      downloadDto;

    // 백업 폴더가 존재하는지 확인하고 없으면 생성
    if (!(await fs.pathExists(destinationDownloadPath))) {
      await fs.ensureDir(destinationDownloadPath);
    }

    const dateFolder = path.join(
      destinationDownloadPath,
      `${startDate}_${endDate}`,
    );
    const startDateObj = startDate ? moment(startDate).toDate() : undefined;
    const endDateObj = endDate ? moment(endDate).toDate() : undefined;

    // 시작 및 종료 날짜를 YYYYMMDD 형식의 문자열로 변환
    const formattedStartDate = this.formatDateToString(startDateObj, 'start');
    const formattedEndDate = this.formatDateToString(endDateObj, 'end');

    // 지정된 날짜 범위의 데이터를 조회
    const dataToBackup = await this.runningInfoRepository.find({
      where: {
        analyzedDttm: Between(formattedStartDate, formattedEndDate),
      },
    });

    // 조회된 데이터에서 slotId를 추출
    const slotIds = dataToBackup.map((item: any) => item.slotId);

    if (slotIds.length === 0) {
      return { success: false, message: 'No data exists' };
    }

    if (!(await fs.pathExists(dateFolder))) {
      let totalFileCount = 0;
      for (const slotId of slotIds) {
        const sourcePath = path.join(originDownloadPath, slotId);
        const files = await fs.readdir(sourcePath);
        totalFileCount += files.length;
      }

      return {
        success: true,
        message: `Success ${totalFileCount}`,
      };
    }
    return {
      success: false,
      message: 'The download file for the specified date already exists',
    };
  }

  async backupData(downloadDto: DownloadDto): Promise<void> {
    const {
      startDate,
      endDate,
      originDownloadPath,
      destinationDownloadPath,
      downloadType,
      projectType,
    } = downloadDto;

    const databaseSchema =
      projectType.toUpperCase() === 'PB' ? 'pb_db_web' : 'bm_db_web';
    // 날짜를 문자열로 변환
    const startDateObj = startDate ? moment(startDate).toDate() : undefined;
    const endDateObj = endDate ? moment(endDate).toDate() : undefined;

    const downloadDriveStart = destinationDownloadPath.split(':')[0];
    const downloadPath =
      downloadDriveStart +
      ':\\' +
      'UIMD_' +
      projectType.toUpperCase() +
      '_backup';

    // 시작 및 종료 날짜를 YYYYMMDD 형식의 문자열로 변환
    const formattedStartDate = this.formatDateToString(startDateObj, 'start');
    const formattedEndDate = this.formatDateToString(endDateObj, 'end');

    // 백업 폴더가 존재하는지 확인하고 없으면 생성
    if (!(await fs.pathExists(downloadPath))) {
      await fs.ensureDir(downloadPath);
    }

    const downloadDateFolder = path.join(
      downloadPath,
      `${startDate}_${endDate}`,
    );

    // 백업 날짜 폴더가 존재하지 않으면 생성
    if (!(await fs.pathExists(downloadDateFolder))) {
      await fs.ensureDir(downloadDateFolder);
    }

    // 지정된 날짜 범위의 데이터를 조회
    const dataToBackup = await this.runningInfoRepository.find({
      where: {
        analyzedDttm: Between(formattedStartDate, formattedEndDate),
      },
    });

    // 조회된 데이터에서 slotId를 추출
    const slotIds = dataToBackup.map((item: any) => item.slotId);

    const moveResults = {
      success: [],
      failed: [],
    };

    const concurrency = 10;
    let activeTasks = 0;

    // 큐 작업 추가
    const queue = slotIds.map((slotId) => {
      const sourcePath = path.join(originDownloadPath, slotId);
      const targetFolderPath = path.join(downloadDateFolder, slotId);
      return {
        source: sourcePath,
        destination: targetFolderPath,
        downloadType,
      };
    });

    const moveImageFiles = async (
      source: string,
      destination: string,
      downloadType: 'copy' | 'move',
    ) => {
      try {
        if (downloadType === 'copy') {
          await fs.copySync(source, destination, {
            overwrite: true,
          });
        } else {
          await fs.moveSync(source, destination, {
            overwrite: true,
          });
        }
        moveResults.success.push(destination);
      } catch (error) {
        moveResults.failed.push(destination);
        console.error(
          `Error ${downloadType === 'copy' ? 'copy' : 'mov'}ing ${source} to ${destination}: ${error}`,
        );
      } finally {
        activeTasks--;
        processQueue();
      }
    };

    // 큐 처리 함수
    const processQueue = () => {
      while (activeTasks < concurrency && queue.length > 0) {
        const { source, destination, downloadType } = queue.shift();
        activeTasks++;
        moveImageFiles(source, destination, downloadType);
      }
    };

    // 큐 처리 시작
    processQueue();

    await new Promise((resolve) => {
      const checkCompletion = setInterval(() => {
        if (activeTasks === 0 && queue.length === 0) {
          clearInterval(checkCompletion);
          resolve(null);
        }
      }, 100);
    });

    // MySQL 데이터베이스 특정 테이블 백업
    const backupFileName = `backup-${startDate}_${endDate}.sql`;
    const sqlBackupFilePath = path.join(downloadDateFolder, backupFileName);

    const dumpCommand = `mysqldump --user=root --password=uimd5191! --host=127.0.0.1 ${databaseSchema} runing_info_entity --where="analyzedDttm BETWEEN '${formattedStartDate}' AND '${formattedEndDate}'" > ${sqlBackupFilePath}`;

    exec(dumpCommand, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing dump command: ${error.message}`);
        return error.message;
      }
      if (stderr) {
        console.error(`mysqldump stderr: ${stderr}`);
        if (downloadType === 'move') {
          await this.runningInfoRepository.delete({
            slotId: In(slotIds),
          });
        }
        return stderr;
      }
      if (stdout) {
        if (downloadType === 'move') {
          await this.runningInfoRepository.delete({
            slotId: In(slotIds),
          });
        }
      }
      console.log(`Database backup saved to ${sqlBackupFilePath}`);
    });
  }

  async openDrive(
    downloadDto: Pick<DownloadDto, 'originDownloadPath'>,
  ): Promise<void> {
    const { originDownloadPath } = downloadDto;

    console.log('제발', originDownloadPath);
    exec(`explorer.exe ${originDownloadPath}`, (err) => {
      if (err) {
        console.error(`Error opening ${originDownloadPath}`, err);
      } else {
        console.log('opening drive success');
      }
    })
  }
}
