import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as fs from 'fs-extra';
import * as path from 'path';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';

@Injectable()
export class RestoreService {
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

  private getMaxId = async (): Promise<number> => {
    const maxId = await this.runningInfoRepository
      .createQueryBuilder('runing_info_entity')
      .select('Max(runing_info_entity.id)', 'max')
      .getRawOne();
    return Number(maxId.max);
  };

  private getInsertStatement = (filePath: string) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    return statements.filter((s) =>
      s.toUpperCase().startsWith('INSERT INTO'),
    )[0];
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
    let insertStatement = this.getInsertStatement(filePath);

    insertStatement = insertStatement.replace(
      /INSERT INTO `runing_info_entity`/,
      'INSERT INTO `restore_runing_info_entity`',
    );

    await this.dataSource.query(createTableStatement);
    await this.dataSource.query(insertStatement);
  };

  private moveDataToDatabase = async () => {
    const restoreSql = `SELECT * FROM restore_runing_info_entity`;

    const items = await this.dataSource.query(restoreSql);
    const isOldTable = items[0].userId;
    let maxId = await this.getMaxId();
    if (isOldTable) {
      for (const item of items) {
        const isExistingItem = await this.runningInfoRepository.findOne({
          where: { slotId: item.slotId },
        });
        if (isExistingItem) continue;

        const savingItem: any = {
          id: maxId++,
          lock_status: 0,
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
          analyzedDttm: item.createDate,
          tactTime: item.tactTime,
          isNormal: item.isNormal,
          cassetId: item.cassetId,
          wbcMemo: item.memo,
          rbcMemo: item.rbcMemo,
          wbcInfo: {
            wbcInfo: item.wbcInfo.wbcInfo[0],
            totalCount: item.wbcInfo.totalCount,
            maxWbcCount: item.maxWbcCount,
          },
          wbcInfoAfter: item.wbcInfoAfter,
          rbcInfo: {
            pltCount: item.pltCount,
            rbcClass: item.rbcInfo,
            maxRbcCount: item.maxRbcCount,
            malariaCount: item.malariaCount,
          },
          rbcInfoAfter: [],
          rbcInfoPosAfter: null,
          maxWbcCount: item.maxWbcCount,
          bf_lowPowerPath: item.lowPowerPath,
          submitState: item.signedState,
          submitOfDate: item.signedOfDate,
          submitUserId: item.signedUserId,
          isNsNbIntegration: item.isNsNbIntegration,
          pcIp: item.pcIp,
          cbcPatientNo: '',
          cbcPatientNm: '',
          cbcSex: '',
          cbcAge: '',
          img_drive_root_path: null,
        };
        await this.runningInfoRepository.save({ ...savingItem });
      }
    } else {
      for (const item of items) {
        const isExistingItem = await this.runningInfoRepository.findOne({
          where: { slotId: item.slotId },
        });
        if (isExistingItem) continue;
        item.id = maxId++;
        item.img_drive_root_path = null;
        item.lock_status = 0;
        await this.runningInfoRepository.save({ ...item });
      }
    }
  };

  private deleteTemporaryTable = async () => {
    const deleteTableSql = 'DROP TABLE IF EXISTS `restore_runing_info_entity`';
    await this.dataSource.query(deleteTableSql);
  };

  private updateImgDriveRootPath = async (fileNames: string[]) => {
    for (const fileName of fileNames) {
      const item = await this.runningInfoRepository.find({
        where: { slotId: fileName },
      });
      const query = `UPDATE runing_info_entity SET img_drive_root_path = NULL WHERE (id = '${item[0].id}');`;
      await this.dataSource.query(query);
    }
  };

  async changeDatabaseAndExecute(fileInfo: any): Promise<string> {
    const { fileName, filePath } = fileInfo;

    const match = fileName.match(
      /^backup-(\d{4}-\d{2}-\d{2})_(\d{4}-\d{2}-\d{2})\.sql$/,
    );

    if (!match) {
      return 'Invalid backup file name';
    }

    const dateFolderPath = `${match[1]}_${match[2]}`;
    const folderPath = `${filePath}\\${dateFolderPath}`;
    const sqlFilePath = `${filePath}\\${dateFolderPath}\\${fileName}`;
    const destinationFolderPath =
      filePath === 'D:\\PB_backup' ? 'D:\\PBIA_proc' : 'D:\\BMIA_proc';
    const databaseName =
      filePath === 'D:\\PB_backup' ? 'pb_db_web' : 'bm_db_web';

    try {
      if (!(await fs.pathExists(sqlFilePath))) {
        return 'Backup file does not exist';
      }

      if (!(await fs.pathExists(folderPath))) {
        return 'Backup folder does not exist';
      }

      if (!(await fs.pathExists(destinationFolderPath))) {
        await fs.ensureDir(destinationFolderPath);
      }

      const folderNamesArr = await this.listDirectoriesInFolder(folderPath);

      /** 이미지 폴더 이동 Logic */
      for (const folderName of folderNamesArr) {
        const sourceFolderPath = path.join(folderPath, folderName);
        const targetFolderPath = path.join(destinationFolderPath, folderName);

        await fs
          .move(sourceFolderPath, targetFolderPath, { overwrite: true })
          .catch((err) => {
            console.error(
              `Error moving ${sourceFolderPath} to ${targetFolderPath}: ${err}`,
            );
          });
      }

      await this.dataSource.query(`USE ${databaseName}`);

      await this.createTemporaryTable(sqlFilePath);

      await this.moveDataToDatabase();

      await this.updateImgDriveRootPath(folderNamesArr);

      await this.deleteTemporaryTable();

      return 'Restoration completed successfully';
    } catch (e) {
      console.log(e);
    }
  }
}
