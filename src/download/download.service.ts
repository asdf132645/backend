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

  private cleanNpmCache() {
    return new Promise((resolve, reject) => {
      exec('npm cache clean --force', (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        if (stderr) {
          console.log(`npm cache clean warning: ${stderr}`);
        }
        resolve(stdout);
      });
    });
  }

  async checkIsPossibleToDownload(
    downloadDto: Pick<
      DownloadDto,
      'startDate' | 'endDate' | 'destinationDownloadPath'
    >,
  ): Promise<DownloadReturn> {
    const { startDate, endDate, destinationDownloadPath } = downloadDto;

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

  private async ensurePermissions(path, permission) {
    try {
      await fs.access(path, permission);
    } catch (error) {
      await fs.chmod(path, 0o666);
    }
  }

  private updateImgDriveRootPath = async (
    availableIds: string[],
    destinationDownloadPath: string,
  ) => {
    const convertedDestinationDownloadPath = destinationDownloadPath.replace(
      '\\',
      '\\\\',
    );

    for (const slotId of availableIds) {
      const item = await this.runningInfoRepository.findOne({
        where: { slotId: slotId },
      });

      if (item) {
        item.img_drive_root_path = convertedDestinationDownloadPath;
        await this.runningInfoRepository.save(item);
      }
    }
  };

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
    if (!(await fs.pathExists(destinationDownloadPath))) {
      await fs.ensureDir(destinationDownloadPath);
    }

    const downloadDateFolder = path.join(
      downloadPath,
      `${startDate}_${endDate}`,
    );

    // 백업 날짜 폴더가 존재하지 않으면 생성
    if (!(await fs.pathExists(downloadDateFolder))) {
      await fs.ensureDir(downloadDateFolder);
    }

    await this.cleanNpmCache();

    // 지정된 날짜 범위의 데이터를 조회
    const dataToBackup = await this.runningInfoRepository.find({
      where: {
        analyzedDttm: Between(formattedStartDate, formattedEndDate),
      },
    });

    // 조회된 데이터에서 slotId를 추출
    const slotIds = dataToBackup.map((item: any) => item.slotId);

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
      const retries = 5;
      const delay = 1000;
      try {
        if (await fs.pathExists(source)) {
          await this.ensurePermissions(
            source,
            fs.constants.R_OK | fs.constants.W_OK,
          );
          await this.ensurePermissions(
            destinationDownloadPath,
            fs.constants.W_OK,
          );
          const operation = async () => {
            if (downloadType === 'copy') {
              await fs.copy(source, destination, { overwrite: true });
            } else {
              await fs.move(source, destination, { overwrite: true });
            }
          };
          await this.retryOperation(operation, retries, delay);
          this.logger.logic(`[Download] - Success ${source}`);
        }
      } catch (error) {
        this.logger.logic(
          `[Download] - Error ${downloadType === 'copy' ? 'copy' : 'mov'}ing ${source} to ${destination}: ${error}`,
        );
      }
    };

    // 큐 처리 함수
    const processQueue = async () => {
      while (queue.length > 0) {
        const newTask = queue.shift();
        if (newTask) {
          const { source, destination, downloadType } = newTask;
          await moveImageFiles(source, destination, downloadType);
        }
      }
    };

    // 큐 처리 시작
    await processQueue();

    // 10개씩 나누어서 실행 -> 현재 실행되는 이동과 Queue 확인
    await new Promise((resolve) => {
      const checkCompletion = () => {
        if (queue.length === 0) {
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
          console.log('destinationDownloadPath', downloadDateFolder);
          await this.updateImgDriveRootPath(slotIds, downloadDateFolder);
        }
        return stderr;
      }
      if (stdout) {
        if (downloadType === 'move') {
          await this.updateImgDriveRootPath(slotIds, downloadDateFolder);
        }
      }
    });
  }

  async openDrive(
    downloadDto: Pick<DownloadDto, 'originDownloadPath'>,
  ): Promise<string[] | string> {
    const { originDownloadPath } = downloadDto;

    // 백업 폴더 없으면 생성
    if (!(await fs.pathExists(originDownloadPath))) {
      await fs.ensureDir(originDownloadPath);
    }

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
