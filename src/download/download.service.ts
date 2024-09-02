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
import { LoggerService } from '../logger.service';

@Injectable()
export class DownloadService {
  constructor(
    @InjectRepository(RuningInfoEntity)
    private readonly runningInfoRepository: Repository<RuningInfoEntity>,
    private readonly logger: LoggerService,
  ) {}
  private moveResults = { success: 0, total: 0 };
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
      this.moveResults.total = slotIds.length;
      this.moveResults.success = 0;
      return {
        success: true,
        message: `Success ${slotIds.length}`,
      };
    }
    return {
      success: false,
      message: 'The download file for the specified date already exists',
    };
  }

  private async moveFile(source: string, destination: string) {
    // 덮어쓰기
    const command = `move ${source}\\* ${destination} /Y`;
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`실행 실패: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`표준 에러: ${stderr}`);
        }
        console.log(`표준 출력: ${stdout}`);
        resolve(null);
      });
    });
  }

  private async copyFile(source: string, destination: string) {
    // 하위 모든 디렉토리 및 파일 복사
    const command = `xcopy ${source}\\* ${destination}\\ /E /I /H`;
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`실행 실패: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`표준 에러: ${stderr}`);
        }
        console.log(`표준 출력: ${stdout}`);
        resolve(null);
      });
    });
  }

  private retryOperation(operation, retries, delay) {
    let attempts = 0;

    const execute = () => {
      attempts++;
      return operation().catch((error) => {
        if (attempts < retries) {
          console.log(`Attempt ${attempts} failed. Retrying in ${delay}ms`);
          return new Promise((resolve) =>
            setTimeout(() => execute().then(resolve), delay),
          );
        } else {
          return Promise.reject(error);
        }
      });
    };

    return execute();
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
      const retries = 3;
      const delay = 1000;
      try {
        if (await fs.pathExists(destinationDownloadPath)) {
          const operation = async () => {
            if (downloadType === 'copy') {
              return await this.copyFile(source, destination);
            } else {
              return await this.moveFile(source, destination);
            }
          };
          await this.retryOperation(operation, retries, delay);
          this.moveResults.success += 1;
        }
      } catch (error) {
        this.logger.logic(
          `[Download] - Error ${downloadType === 'copy' ? 'copy' : 'mov'}ing ${source} to ${destination}: ${error}`,
        );
      } finally {
        this.moveResults.total -= 1;
        activeTasks--;
        processQueue();
      }
    };

    // 큐 처리 함수
    const processQueue = async () => {
      while (activeTasks < concurrency && queue.length > 0) {
        const newTask = queue.shift();
        if (newTask) {
          const { source, destination, downloadType } = newTask;
          activeTasks++;
          moveImageFiles(source, destination, downloadType);
        }
      }
    };

    // 큐 처리 시작
    await processQueue();

    // 10개씩 나누어서 실행 -> 현재 실행되는 이동과 Queue 확인
    await new Promise((resolve) => {
      const checkCompletion = () => {
        if (activeTasks === 0 && queue.length === 0) {
          resolve(null); // 성공
        } else {
          setTimeout(checkCompletion, 1000);
        }
      };
      checkCompletion();
    });

    // MySQL 데이터베이스 특정 테이블 백업
    const backupFileName = `backup-${startDate}_${endDate}.sql`;
    const sqlBackupFilePath = path.join(downloadDateFolder, backupFileName);

    const dumpCommand = `mysqldump --user=root --password=uimd5191! --host=127.0.0.1 ${databaseSchema} runing_info_entity --where="analyzedDttm BETWEEN '${formattedStartDate}' AND '${formattedEndDate}'" > ${sqlBackupFilePath}`;

    exec(dumpCommand, async (error, stdout, stderr) => {
      if (error) {
        this.logger.logic(
          `[OpenDrive] - Error executing dump command: ${error.message}`,
        );
        return error.message;
      }
      if (stderr) {
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
    });
  }

  async checkDataMoved() {
    return this.moveResults;
  }

  async openDrive(
    downloadDto: Pick<DownloadDto, 'originDownloadPath'>,
  ): Promise<string[] | string> {
    const { originDownloadPath } = downloadDto;

    // 백업 폴더 없으면 생성
    if (!(await fs.pathExists(originDownloadPath))) {
      await fs.ensureDir(originDownloadPath);
    }

    // try {
    //   const entries = await fs.readdir(originDownloadPath, {
    //     withFileTypes: true,
    //   });
    //
    //   const topLevelDirectories = entries
    //     .filter((entry) => entry.isDirectory())
    //     .map((dir) => dir.name);
    //
    //   return topLevelDirectories;
    // } catch (error) {
    //   return 'Error reading download path';
    // }

    // 이전 코드
    exec(`explorer.exe ${originDownloadPath}`, (err) => {
      if (err) {
        this.logger.logic(
          `[OpenDrive] - Error opening ${originDownloadPath} : ${err}`,
        );
      } else {
        this.logger.logic(`[OpenDrive] - Opening drive success`);
      }
    });
    return 'Success';
  }
}
