import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import * as fs from 'fs-extra';
import * as path from 'path';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { UploadDto } from './upload.dto';
import { LoggerService } from '../logger.service';
import { exec } from 'child_process';

@Injectable()
export class UploadService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(RuningInfoEntity)
    private readonly runningInfoRepository: Repository<RuningInfoEntity>,
    private readonly logger: LoggerService,
  ) {}
  private moveResults = { success: 0, total: 0 };
  private listDirectoriesInFolder = async (
    folderPath: string,
  ): Promise<string[]> => {
    const folderNamesArr = [];
    try {
      // 폴더 내 모든 파일과 디렉토리의 목록을 가져옵니다.
      const items = await fs.readdir(folderPath);

      // 각 항목의 경로를 생성하고, 디렉토리인지 확인합니다.
      for (const item of items) {
        const itemPath = path.join(folderPath, item);
        const stats = await fs.stat(itemPath);

        // 디렉토리인 경우 폴더 이름을 출력합니다.
        if (stats.isDirectory()) {
          folderNamesArr.push(item);
        }
      }

      return folderNamesArr;
    } catch (error) {
      this.logger.logic(`[Upload] Error reading directories: ${error}`);
      return [];
    }
  };

  private getInsertStatement = (filePath: string) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    return statements.filter((s) => s.toUpperCase().startsWith('INSERT INTO'));
  };

  private getCreateTableStatement = (sql: string) => {
    // CREATE TABLE 부분 추출
    const createTableRegex =
      /CREATE TABLE `runing_info_entity` \(([\s\S]*?)\)\s*ENGINE=[^\s]+/;
    const match = sql.match(createTableRegex);

    let createTableStatement = match[0];

    createTableStatement = createTableStatement.replace(
      /CREATE TABLE `runing_info_entity`/,
      'CREATE TABLE IF NOT EXISTS `restore_runing_info_entity`',
    );

    const engineMatch = createTableStatement.match(/ ENGINE=InnoDB/);
    createTableStatement = createTableStatement.replace(engineMatch[0], ';');

    return createTableStatement;
  };

  private createTemporaryTable = async (filePath: string) => {
    let sql = fs.readFileSync(filePath, 'utf8');

    // DROP TABLE 구문을 제거
    const dropTableMatch = sql.match(
      /DROP TABLE IF EXISTS `runing_info_entity`;/,
    );
    if (dropTableMatch) {
      sql = sql.replace(dropTableMatch[0], '');
    }

    let createTableStatement = this.getCreateTableStatement(sql);
    createTableStatement = createTableStatement.replace(
      /CREATE TABLE `runing_info_entity`/,
      'CREATE TABLE IF NOT EXISTS `restore_runing_info_entity`',
    );
    await this.dataSource.query(createTableStatement);

    const insertStatements = this.getInsertStatement(filePath);
    for (let insertStatement of insertStatements) {
      insertStatement = insertStatement.replace(
        /INSERT INTO `runing_info_entity`/,
        'INSERT INTO `restore_runing_info_entity`',
      );
      await this.dataSource.query(insertStatement);
    }
  };

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

  private moveDataToDatabase = async () => {
    const restoreSql = `SELECT * FROM restore_runing_info_entity`;
    const items = await this.dataSource.query(restoreSql);

    const slotIds = items.map((item) => item?.slotId);

    const existingItems = await this.runningInfoRepository.find({
      where: { slotId: In(slotIds) },
      select: ['slotId'],
    });

    const existingSlotIdSet = new Set(existingItems.map((item) => item.slotId));

    const itemsToSave = items
      .filter((item) => !existingSlotIdSet.has(item?.slotId))
      .map((item) => ({
        slotNo: item.slotNo,
        traySlot: item.traySlot,
        testType: item.testType,
        barcodeNo: item.barcodeNo,
        patientId: item.patientId,
        patientNm: item.patientNm,
        gender: item.gender,
        birthDay: item.birthDay,
        wbcCount: item.wbcCount,
        slotId: item.slotId,
        orderDttm: item.orderDttm,
        analyzedDttm: item.analyzedDttm,
        tactTime: item.tactTime,
        isNormal: item.isNormal,
        cassetId: item.cassetId,
        wbcMemo: item.wbcMemo,
        rbcMemo: item.rbcMemo,
        wbcInfo: item.wbcInfo,
        wbcInfoAfter: item.wbcInfoAfter,
        rbcInfo: item.rbcInfo,
        rbcInfoAfter: item.rbcInfoAfter,
        rbcInfoPosAfter: item.rbcInfoPosAfter,
        maxWbcCount: item.maxWbcCount,
        bf_lowPowerPath: item.bf_lowPowerPath,
        submitState: item.submitState,
        submitOfDate: item.submitOfDate,
        submitUserId: item.submitUserId,
        isNsNbIntegration: item.isNsNbIntegration,
        pcIp: item.pcIp,
        cbcPatientNo: item.cbcPatientNo,
        cbcPatientNm: item.cbcPatientNm,
        cbcSex: item.cbcSex,
        cbcAge: item.cbcAge,
        img_drive_root_path: null,
        lock_status: 0,
      }));

    // 일괄 삽입 처리
    if (itemsToSave.length > 0) {
      await this.runningInfoRepository.save(itemsToSave);
    }
  };

  private checkDuplicatedInDatabase = async () => {
    const restoreSql = `SELECT slotId, barcodeNo FROM restore_runing_info_entity`;

    const items = await this.dataSource.query(restoreSql);
    const slotIds = items.map((item) => item.slotId);
    const existingItems = await this.runningInfoRepository.find({
      where: { slotId: In(slotIds) },
    });

    const existingSlotIdSet = new Set(existingItems.map((item) => item.slotId));

    const duplicatedSlotIdArr = [];
    const nonDuplicatedSlotIdArr = [];

    for (const item of items) {
      if (existingSlotIdSet.has(item.slotId)) {
        duplicatedSlotIdArr.push(item.barcodeNo);
      } else {
        nonDuplicatedSlotIdArr.push(item.barcodeNo);
      }
    }

    // 겹치는 데이터가 없는 경우 다음 Upload API를 호출하기 때문에 total값과 success값을 준비
    if (duplicatedSlotIdArr.length === 0) {
      this.moveResults.success = 0;
      this.moveResults.total = nonDuplicatedSlotIdArr.length;
    }

    return {
      duplicated: duplicatedSlotIdArr,
      nonDuplicated: nonDuplicatedSlotIdArr,
      totalMove: this.moveResults.total,
      successMove: this.moveResults.success,
    };
  };

  private deleteTemporaryTable = async () => {
    const deleteTableSql = 'DROP TABLE IF EXISTS `restore_runing_info_entity`';
    await this.dataSource.query(deleteTableSql);
  };

  private deleteImageFolder = async (folderPath) => {
    if (await fs.pathExists(folderPath)) {
      try {
        fs.removeSync(folderPath);
      } catch (e) {
        this.logger.logic(`[Upload] Error(Remained Image Folder): ${e}`);
      }
    }
  };

  private updateImgDriveRootPath = async (
    availableIds: string[],
    destinationUploadPath: string,
  ) => {
    const convertedDestinationUploadPath = destinationUploadPath.replace(
      '\\',
      '\\\\',
    );
    for (const id of availableIds) {
      const query = `UPDATE runing_info_entity SET img_drive_root_path = '${convertedDestinationUploadPath}' WHERE (id = '${id}');`;
      await this.dataSource.query(query);
    }
  };

  private async ensurePermissions(path, permission) {
    try {
      await fs.access(path, permission);
    } catch (error) {
      await fs.chmod(path, 0o666);
    }
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

  private moveImages = async (
    fileNames: string[],
    originUploadPath: string,
    destinationUploadPath: string,
    uploadType: 'copy' | 'move',
  ) => {
    const availableFileNames = [];
    const availableIds = [];

    const processFileName = async (fileName: string) => {
      try {
        const items: any[] = await this.runningInfoRepository.find({
          where: { slotId: fileName },
        });

        if (Array.isArray(items) && items[0]?.slotId) {
          availableFileNames.push(fileName);
          availableIds.push(items[0].id);
        } else {
          console.log(`Unexpected data format for slotId: ${fileName}`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    await Promise.all(fileNames.map((fileName) => processFileName(fileName)));

    const queue = availableFileNames.map((slotId) => {
      const sourcePath = path.join(originUploadPath, slotId);
      const targetFolderPath = path.join(destinationUploadPath, slotId);
      return { source: sourcePath, destination: targetFolderPath, uploadType };
    });

    this.moveResults.total = availableFileNames.length;

    const moveImageFiles = async (
      source: string,
      destination: string,
      uploadType: 'copy' | 'move',
    ) => {
      try {
        const retries = 5;
        const delay = 1000;
        if (
          (await fs.pathExists(destinationUploadPath)) &&
          (await fs.pathExists(source))
        ) {
          await this.ensurePermissions(
            source,
            fs.constants.R_OK | fs.constants.W_OK,
          );
          await this.ensurePermissions(
            destinationUploadPath,
            fs.constants.W_OK,
          );
          const operation = async () => {
            if (uploadType === 'copy') {
              await fs.copy(source, destination, { overwrite: true });
            } else {
              await fs.move(source, destination, { overwrite: true });
            }
          };
          await this.retryOperation(operation, retries, delay);
        }
      } catch (err) {
        this.logger.logic(
          `[Upload] Error moving ${source} to ${destination}: ${err}`,
        );
      }
    };

    const processQueue = async () => {
      while (queue.length > 0) {
        const newTask = queue.shift();
        if (newTask) {
          const { source, destination, uploadType } = newTask;
          await moveImageFiles(source, destination, uploadType);
        }
      }
    };

    await processQueue();

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

    return availableIds;
  };

  async changeDatabaseAndExecute(fileInfo: UploadDto): Promise<string> {
    const {
      fileName,
      destinationUploadPath,
      projectType,
      originUploadPath,
      uploadType,
    } = fileInfo;

    const databaseName =
      projectType.toUpperCase() === 'PB' ? 'pb_db_web' : 'bm_db_web';

    await this.deleteTemporaryTable();

    const uploadDateFolderName = path.join(originUploadPath, fileName);

    fs.access(uploadDateFolderName, fs.constants.R_OK);
    const entries = await fs.readdir(uploadDateFolderName, {
      withFileTypes: true,
    });

    const sqlFileName = entries
      .filter((entry) => entry.name.includes('.sql'))
      .map((file) => file.name)[0];
    const sqlFilePath = `${uploadDateFolderName}\\${sqlFileName}`;

    try {
      // PBIA_proc or BMIA_proc 없을 시 생성 코드
      if (!(await fs.pathExists(destinationUploadPath))) {
        await fs.ensureDir(destinationUploadPath);
      }

      if (!(await fs.pathExists(uploadDateFolderName))) {
        return 'Upload folder does not exist';
      }

      if (!(await fs.pathExists(sqlFilePath))) {
        return 'Upload file does not exist';
      }

      if (!(await fs.pathExists(destinationUploadPath))) {
        await fs.ensureDir(destinationUploadPath);
      }

      await this.cleanNpmCache();

      const folderNamesArr =
        await this.listDirectoriesInFolder(uploadDateFolderName);

      await this.dataSource.query(`USE ${databaseName}`);

      await this.createTemporaryTable(sqlFilePath);

      await this.moveDataToDatabase();

      // 폴더 이동 전에 DB에 있는 폴더들만 이동
      const availableIds = await this.moveImages(
        folderNamesArr,
        uploadDateFolderName,
        destinationUploadPath,
        uploadType,
      );

      await this.updateImgDriveRootPath(availableIds, destinationUploadPath);

      await this.deleteTemporaryTable();

      if (uploadType === 'move') {
        await this.deleteImageFolder(uploadDateFolderName);
      }

      return 'Upload completed successfully';
    } catch (e) {
      console.log(e);
    }
  }

  async checkDuplicatedData(fileInfo: UploadDto): Promise<any> {
    const { fileName, destinationUploadPath, originUploadPath, projectType } =
      fileInfo;

    const databaseName =
      projectType.toUpperCase() === 'PB' ? 'pb_db_web' : 'bm_db_web';

    await this.deleteTemporaryTable();

    const uploadDateFolderName = path.join(originUploadPath, fileName);

    fs.access(uploadDateFolderName, fs.constants.R_OK);
    const entries = await fs.readdir(uploadDateFolderName, {
      withFileTypes: true,
    });


    const sqlFileName = entries
      .filter((entry) => entry.name.includes('.sql'))
      .map((file) => file.name)[0];

    const sqlFilePath = `${uploadDateFolderName}\\${sqlFileName}`;

    try {
      if (!(await fs.pathExists(destinationUploadPath))) {
        await fs.ensureDir(destinationUploadPath);
      }

      if (!(await fs.pathExists(uploadDateFolderName))) {
        return 'Download folder does not exist';
      }

      if (!(await fs.pathExists(sqlFilePath))) {
        return 'Download file does not exist';
      }

      await this.dataSource.query(`USE ${databaseName}`);

      await this.createTemporaryTable(sqlFilePath);

      return await this.checkDuplicatedInDatabase();
    } catch (e) {
      this.logger.logic(`[UPLOAD] Error: ${e}`);
      return `Invalid access`;
    }
  }

  async checkPossibleUploadFile(
    fileInfo: Pick<UploadDto, 'originUploadPath'>,
  ): Promise<any> {
    const { originUploadPath } = fileInfo;

    // 백업 폴더 없을 경우
    if (!(await fs.pathExists(originUploadPath))) {
      return { success: false, message: 'Download folder does not exits' };
    }

    try {
      fs.access(originUploadPath, fs.constants.R_OK);
      const entries = await fs.readdir(originUploadPath, {
        withFileTypes: true,
      });

      const topLevelDirectories = entries
        .filter((entry) => entry.isDirectory())
        .map((dir) => dir.name);

      return topLevelDirectories;
    } catch (error) {
      return { success: false, message: 'Error reading download path' };
    }
  }
}
