// download.service.ts
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { DownloadDto, DownloadReturn } from './download.dto';
import { exec } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as moment from 'moment';
import * as os from 'os';
import { LoggerService } from '../logger.service';

const userInfo = os.userInfo();

@Injectable()
export class DownloadService {
  private moveResults = { success: 0, total: 0 };

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(RuningInfoEntity)
    private readonly runningInfoRepository: Repository<RuningInfoEntity>,
    private readonly logger: LoggerService,
  ) {}

  private async cleanNpmCache(): Promise<void> {
    await this.execCommand('npm cache clean --force');
  }

  private formatDate(date: Date, type: 'start' | 'end'): string {
    const formattedDate = moment(date).format('YYYYMMDD');
    return type === 'start'
      ? `${formattedDate}000000000`
      : `${formattedDate}999999999`;
  }

  private async ensureDirectoryExists(directoryPath: string) {
    if (!(await fs.pathExists(directoryPath))) {
      await fs.ensureDir(directoryPath);
    }
  }

  private async runPythonScript(
    queue: any[],
    downloadType: string,
  ): Promise<void> {
    const scriptPath = `${userInfo.homedir}\\AppData\\Local\\Programs\\UIMD\\web\\UIMD_download_upload_tool\\move_files.exe`;

    // JSON 데이터를 임시 파일에 저장
    const tempFilePath = path.join(
      os.tmpdir(),
      `queue_data_${Date.now()}.json`,
    );

    try {
      // JSON 데이터를 임시 파일에 동기적으로 저장
      fs.writeFileSync(tempFilePath, JSON.stringify(queue));
      console.log(`Temp file created at: ${tempFilePath}`);

      // exec를 프로미스로 감싸기
      const { stdout } = await new Promise<{
        stdout: string;
        stderr: string;
      }>((resolve, reject) => {
        exec(
          `${scriptPath} ${tempFilePath} ${downloadType}`,
          (error, stdout, stderr) => {
            if (error) {
              console.log('error', error);
              this.logger.logic(
                `[PythonScript] - Error executing script: ${error.message}`,
              );
              return reject(error);
            }

            if (stderr) {
              console.log('stderr', stderr);
              this.logger.logic(`[PythonScript] - Warning: ${stderr}`);
            }

            console.log(
              `error - ${error} | stdout - ${stdout} | stderr - ${stderr}`,
            );
            resolve({ stdout, stderr });
          },
        );
      });

      // 정상적으로 종료되었는지 확인
      if (stdout) {
        console.log('stdout:', stdout);
        console.log('All operations completed successfully.');
      } else {
        this.logger.logic(`Python script did not complete successfully`);
      }

      try {
        if (fs.pathExists(tempFilePath)) {
          await fs.remove(tempFilePath);
          console.log(`[PythonScript] - Temp file deleted: ${tempFilePath}`);
        }
      } catch (deleteError) {
        this.logger.logic(
          `[PythonScript] - Error deleting temp file: ${deleteError.message}`,
        );
      }
    } catch (error) {
      this.logger.logic(`[PythonScript] - Error: ${error.message}`);
    }
  }

  private execCommand(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          this.logger.logic(
            `[Command] - Error executing ${command}: ${error.message}`,
          );
          return reject(error);
        }
        if (stderr) {
          this.logger.logic(`[Command] - Warning: ${stderr}`);
        }
        resolve();
      });
    });
  }

  private async fetchDataByDateRange(startDate: Date, endDate: Date) {
    const formattedStart = this.formatDate(startDate, 'start');
    const formattedEnd = this.formatDate(endDate, 'end');

    const query = `
      SELECT slotId
      FROM runing_info_entity
      WHERE analyzedDttm BETWEEN ? AND ?;
    `;

    const slotIdArray = await this.runningInfoRepository.query(query, [
      formattedStart,
      formattedEnd,
    ]);
    return slotIdArray.map((item: { slotId: string }) => item.slotId);
  }

  private async readFolderNames(dirPath: string): Promise<string[]> {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    return files.filter((file) => file.isDirectory()).map((file) => file.name);
  }

  private checkAvailableFolders = async (path: string, slotIds: string[]) => {
    const folderNames = await this.readFolderNames(path);
    return folderNames.filter((folderName) => slotIds.includes(folderName));
  };

  private async updateImgDriveRootPath(
    availableIds: string[],
    destinationUploadPath: string,
  ) {
    const convertedDestinationUploadPath = destinationUploadPath.replaceAll(
      '\\',
      '\\\\',
    );
    const ids = availableIds.map((id) => `'${id}'`).join(',');
    const query = `UPDATE runing_info_entity SET img_drive_root_path = '${convertedDestinationUploadPath}' WHERE slotId IN (${ids})`;
    await this.dataSource.query(query);
  }

  async checkIsPossibleToDownload(
    downloadDto: Pick<
      DownloadDto,
      'startDate' | 'endDate' | 'destinationDownloadPath' | 'originDownloadPath'
    >,
  ): Promise<DownloadReturn> {
    const { startDate, endDate, destinationDownloadPath, originDownloadPath } =
      downloadDto;

    await this.ensureDirectoryExists(destinationDownloadPath);

    console.log('originDownloadPath', originDownloadPath);
    const dateFolder = path.join(
      destinationDownloadPath,
      `${startDate}_${endDate}`,
    );
    const availableSlotIdsFromDB = await this.fetchDataByDateRange(
      moment(startDate).toDate(),
      moment(endDate).toDate(),
    );

    const moveAvailableFolders = await this.checkAvailableFolders(
      originDownloadPath,
      availableSlotIdsFromDB,
    );

    if (moveAvailableFolders.length === 0) {
      return { success: false, message: 'No data exists' };
    }

    if (await fs.pathExists(dateFolder)) {
      return {
        success: false,
        message: 'The download file for the specified date already exists',
      };
    }

    this.moveResults.total = moveAvailableFolders.length;
    this.moveResults.success = 0;
    return {
      success: true,
      message: `Success ${moveAvailableFolders.length}`,
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
    const schema =
      projectType.toUpperCase() === 'PB' ? 'pb_db_web' : 'bm_db_web';

    const downloadPath = `${destinationDownloadPath.split(':')[0]}:\\UIMD_${projectType.toUpperCase()}_backup`;
    const downloadDateFolder = path.join(
      downloadPath,
      `${startDate}_${endDate}`,
    );

    await this.ensureDirectoryExists(downloadDateFolder);
    await this.cleanNpmCache();

    const availableSlotIdsFromDB = await this.fetchDataByDateRange(
      moment(startDate).toDate(),
      moment(endDate).toDate(),
    );

    const queue = availableSlotIdsFromDB.map((slotId) => ({
      source: path.join(originDownloadPath, slotId),
      destination: path.join(downloadDateFolder, slotId),
    }));

    const concurrency = 5;
    // const chunkedQueue = [];

    // 배열을 주어진 크기로 나누는 함수
    const splitIntoChunks = (array, chunkSize) => {
      const chunks = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
    };

    // const divideIntoChunks = (array: string[], chunkSize: number) => {
    //   let remainQueueItem = 0;
    //
    //   chunkedQueue.push()
    //   while (remainQueueItem < array.length) {
    //
    //   }
    // }

    // 청크 단위로 Python 스크립트를 실행하는 함수
    const processQueueInChunks = async (queue, downloadType) => {
      const chunkedQueue = splitIntoChunks(queue, concurrency);

      for (const chunk of chunkedQueue) {
        await Promise.all(
          chunk.map((task) => this.runPythonScript([task], downloadType)),
        );
      }
    };

    // 큐를 10개씩 나눠서 처리
    await processQueueInChunks(queue, downloadType);

    if (downloadType === 'move') {
      await this.updateImgDriveRootPath(
        availableSlotIdsFromDB,
        downloadDateFolder,
      );
    }

    const backupFile = path.join(
      downloadDateFolder,
      `backup-${startDate}_${endDate}.sql`,
    );
    const dumpCommand = `mysqldump --user=root --password=uimd5191! --host=127.0.0.1 ${schema} runing_info_entity --where="analyzedDttm BETWEEN '${this.formatDate(moment(startDate).toDate(), 'start')}' AND '${this.formatDate(moment(endDate).toDate(), 'end')}'" > ${backupFile}`;

    await this.execCommand(dumpCommand);
  }

  async openDrive(
    downloadDto: Pick<DownloadDto, 'originDownloadPath'>,
  ): Promise<string> {
    const { originDownloadPath } = downloadDto;

    await this.ensureDirectoryExists(originDownloadPath);

    exec(`explorer.exe ${originDownloadPath}`, (err) => {
      if (err) {
        this.logger.error(
          `[OpenDrive] - Error opening ${originDownloadPath}: ${err}`,
        );
      } else {
        this.logger.log(
          `[OpenDrive] - Successfully opened ${originDownloadPath}`,
        );
      }
    });

    return 'Success';
  }
}
