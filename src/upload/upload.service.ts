import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import * as fs from 'fs-extra';
import * as path from 'path';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { UploadDto } from './upload.dto';

@Injectable()
export class UploadService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(RuningInfoEntity)
    private readonly runningInfoRepository: Repository<RuningInfoEntity>,
  ) {}
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
      console.error('Error reading directories:', error);
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

    return {
      duplicated: duplicatedSlotIdArr,
      nonDuplicated: nonDuplicatedSlotIdArr,
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
        console.log(e);
      }
    }
  };

  private updateImgDriveRootPath = async (
    availableIds: string[],
    destinationUploadPath: string,
  ) => {
    destinationUploadPath.split('\\').join('\\\\');
    for (const id of availableIds) {
      const query = `UPDATE runing_info_entity SET img_drive_root_path = '${destinationUploadPath}' WHERE (id = '${id}');`;
      await this.dataSource.query(query);
    }
  };

  private moveImages = async (
    fileNames: string[],
    originUploadPath: string,
    destinationUploadPath: string,
    uploadType: 'copy' | 'move',
  ) => {
    const availableFileNames = [];
    const availableIds = [];
    for (const fileName of fileNames) {
      const item: any = await this.runningInfoRepository.find({
        where: { slotId: fileName },
      });
      if (item[0]?.slotId) {
        availableFileNames.push(fileName);
        availableIds.push(item[0].id);
      }
    }

    const moveResults = {
      success: [],
      failed: [],
    };
    const concurrency = 10;
    let activeTasks = 0;

    const queue = availableFileNames.map((slotId) => {
      const sourcePath = path.join(originUploadPath, slotId);
      const targetFolderPath = path.join(destinationUploadPath, slotId);
      return {
        source: sourcePath,
        destination: targetFolderPath,
        uploadType,
      };
    });

    const moveImageFiles = async (
      source: string,
      destination: string,
      uploadType: 'copy' | 'move',
    ) => {
      try {
        if (uploadType === 'copy') {
          await fs.copySync(source, destination, {
            overwrite: true,
          });
        } else {
          await fs.moveSync(source, destination, {
            overwrite: true,
          });
        }

        moveResults.success.push(destination);
      } catch (err) {
        moveResults.failed.push(destination);
        console.error(`Error moving ${source} to ${destination}: ${err}`);
      } finally {
        activeTasks--;
        processQueue();
      }
    };

    const processQueue = () => {
      while (activeTasks < concurrency && queue.length > 0) {
        const { source, destination, uploadType } = queue.shift();
        activeTasks++;
        moveImageFiles(source, destination, uploadType);
      }
    };

    processQueue();

    await new Promise((resolve) => {
      const checkCompletion = setInterval(() => {
        if (activeTasks === 0 && queue.length === 0) {
          clearInterval(checkCompletion);
          resolve(null);
        }
      }, 100);
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
    const originDriveStart = originUploadPath.split(':')[0];
    const uploadOriginPath =
      originDriveStart +
      ':\\' +
      'UIMD_' +
      projectType.toUpperCase() +
      '_backup';

    await this.deleteTemporaryTable();

    const match = fileName.match(
      /^backup-(\d{4}-\d{2}-\d{2})_(\d{4}-\d{2}-\d{2})\.sql$/,
    );

    if (!match) {
      return 'Invalid download file name';
    }

    const dateFolderPath = `${match[1]}_${match[2]}`;
    const folderPath = `${uploadOriginPath}\\${dateFolderPath}`;
    const sqlFilePath = `${uploadOriginPath}\\${dateFolderPath}\\${fileName}`;

    try {
      // PBIA_proc or BMIA_proc 없을 시 생성 코드
      if (!(await fs.pathExists(destinationUploadPath))) {
        await fs.ensureDir(destinationUploadPath);
      }

      if (!(await fs.pathExists(folderPath))) {
        return 'Backup folder does not exist';
      }

      if (!(await fs.pathExists(sqlFilePath))) {
        return 'Backup file does not exist';
      }

      if (!(await fs.pathExists(destinationUploadPath))) {
        await fs.ensureDir(destinationUploadPath);
      }

      const folderNamesArr = await this.listDirectoriesInFolder(folderPath);

      await this.dataSource.query(`USE ${databaseName}`);

      await this.createTemporaryTable(sqlFilePath);

      await this.moveDataToDatabase();

      // 폴더 이동 전에 DB에 있는 폴더들만 이동
      const availableIds = await this.moveImages(
        folderNamesArr,
        folderPath,
        destinationUploadPath,
        uploadType,
      );

      await this.updateImgDriveRootPath(availableIds, destinationUploadPath);

      await this.deleteTemporaryTable();

      if (uploadType === 'move') {
        await this.deleteImageFolder(folderPath);
      }

      return 'Restoration completed successfully';
    } catch (e) {
      console.log(e);
    }
  }

  async checkDuplicatedData(fileInfo: UploadDto): Promise<any> {
    const { fileName, destinationUploadPath, originUploadPath, projectType } =
      fileInfo;

    const databaseName =
      projectType.toUpperCase() === 'PB' ? 'pb_db_web' : 'bm_db_web';
    const originDriveStart = originUploadPath.split(':')[0];
    const originDownloadPath =
      originDriveStart +
      ':\\' +
      'UIMD_' +
      projectType.toUpperCase() +
      '_backup';

    await this.deleteTemporaryTable();

    const match = fileName.match(
      /^backup-(\d{4}-\d{2}-\d{2})_(\d{4}-\d{2}-\d{2})\.sql$/,
    );

    if (!match) {
      return 'Invalid download file name';
    }

    const dateFolderPath = `${match[1]}_${match[2]}`;
    const folderPath = `${originDownloadPath}\\${dateFolderPath}`;
    const sqlFilePath = `${originDownloadPath}\\${dateFolderPath}\\${fileName}`;

    try {
      if (!(await fs.pathExists(destinationUploadPath))) {
        await fs.ensureDir(destinationUploadPath);
      }

      if (!(await fs.pathExists(folderPath))) {
        return 'Download folder does not exist';
      }

      if (!(await fs.pathExists(sqlFilePath))) {
        return 'Download file does not exist';
      }

      await this.dataSource.query(`USE ${databaseName}`);

      await this.createTemporaryTable(sqlFilePath);

      const duplicatedData = await this.checkDuplicatedInDatabase();
      return duplicatedData;
    } catch (e) {
      return `Error: ${e}`;
    }
  }
}