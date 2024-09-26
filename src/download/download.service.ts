// download.service.ts
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { DownloadDto, DownloadReturn } from './download.dto';
import { exec, execSync } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as moment from 'moment';
import * as os from 'os';
import { LoggerService } from '../logger.service';

const userInfo = os.userInfo();

@Injectable()
export class DownloadService {
  private moveResults = { success: 0, total: 0 };
  private readonly pythonScriptPath = `${userInfo.homedir}\\AppData\\Local\\Programs\\UIMD\\web\\UIMD_download_upload_tool\\move_files.exe`;

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(RuningInfoEntity)
    private readonly runningInfoRepository: Repository<RuningInfoEntity>,
    private readonly logger: LoggerService,
  ) {}

  // npm 캐시 삭제 함수
  private cleanNpmCache = () => this.execCommand('npm cache clean --force');

  // analyzedDttm 형식으로 바꾸는 date 함수
  private formatDate(date: Date, type: 'start' | 'end'): string {
    const formattedDate = moment(date).format('YYYYMMDD');
    return type === 'start'
      ? `${formattedDate}000000000`
      : `${formattedDate}999999999`;
  }

  // 폴더가 없으면 폴더 생성하는 함수
  private async ensureDirectoryExists(directoryPath: string) {
    if (!(await fs.pathExists(directoryPath))) {
      await fs.ensureDir(directoryPath);
    }
  }

  // 이미지 이동은 파이썬 실행파일을 사용
  private runPythonScript(task: any, downloadType: string) {
    const { source, destination } = task;
    try {
      const stdout = execSync(
        `${this.pythonScriptPath}  ${JSON.stringify(source)} ${JSON.stringify(destination)} ${downloadType}`,
      );
      console.log('stdout -------', stdout.toString());
    } catch (error) {
      console.log('error ------', error);
    }
  }

  private execCommand(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          this.logger.logic(
            `[Command] - Error executing ${command}: ${error.message}`,
          );
          reject(error);
        }
        if (stderr) {
          this.logger.logic(`[Command] - Warning: ${stderr}`);
        }
        resolve();
      });
    });
  }

  // DB에 접근하여 anaylzedDttm에 해당하는 slotId 배열 가져오는 함수
  private async fetchDataByDateRange(startDate: Date, endDate: Date) {
    const query = `
      SELECT slotId
      FROM runing_info_entity
      WHERE analyzedDttm BETWEEN ? AND ?;
    `;

    const slotIdArray = await this.runningInfoRepository.query(query, [
      this.formatDate(startDate, 'start'),
      this.formatDate(endDate, 'end'),
    ]);
    return slotIdArray.map((item: { slotId: string }) => item.slotId);
  }

  // 폴더 내의 폴더 이름들 가져오는 함수
  private async readFolderNames(dirPath: string): Promise<string[]> {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    return files.filter((file) => file.isDirectory()).map((file) => file.name);
  }

  // DB와 실제 로컬 데이터(이미지 파일들) 비교하는 함수
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

  async downloadOperation(downloadDto: DownloadDto): Promise<void> {
    const {
      startDate,
      endDate,
      originDownloadPath,
      destinationDownloadPath,
      downloadType,
      projectType,
    } = downloadDto;

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

    const queue = (
      await Promise.all(
        availableSlotIdsFromDB.map(async (slotId) => {
          const sourcePath = path.join(originDownloadPath, slotId);
          if (await fs.pathExists(sourcePath)) {
            return {
              source: sourcePath,
              destination: path.join(downloadDateFolder, slotId),
            };
          }
          return null; // 존재하지 않을 경우 null 반환
        }),
      )
    ).filter(Boolean);

    for (const task of queue) {
      this.runPythonScript(task, downloadType);
    }

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
    const schema =
      projectType.toUpperCase() === 'PB' ? 'pb_db_web' : 'bm_db_web';
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
