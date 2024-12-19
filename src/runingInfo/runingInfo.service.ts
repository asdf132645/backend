// runing-info.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, EntityManager, DataSource, Between } from 'typeorm';
import { RuningInfoEntity } from './runingInfo.entity';
import * as moment from 'moment';
import * as os from 'os';
import * as path from 'path';
import {
  CreateRuningInfoDto,
  UpdateRuningInfoDto,
} from './dto/runingInfoDtoItems';
import { LoggerService } from '../logger.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { exec, spawn } from 'child_process';
import axios from 'axios';

const userInfo = os.userInfo();

@Injectable()
export class RuningInfoService {
  // private readonly pythonScriptPath = `${userInfo.homedir}\\AppData\\Local\\Programs\\UIMD\\UIMD_download_upload_tool\\file_operation.exe`;
  private readonly fileOperationExpressServerPath = `${userInfo.homedir}\\AppData\\Local\\Programs\\UIMD\\UIMD_fileOperation_server`;
  constructor(
    private readonly logger: LoggerService,
    private readonly dataSource: DataSource, // 트랜잭션을 사용 하여 비동기 작업의 타이밍 문제를 해결
    @InjectRepository(RuningInfoEntity)
    private readonly runingInfoEntityRepository: Repository<RuningInfoEntity>,
    @InjectRedis() private readonly redis: Redis, // Redis 인스턴스 주입
  ) {}

  async addUniqueConstraintToSlotId() {
    try {
      const entityManager = this.runingInfoEntityRepository.manager;

      // UNIQUE 제약 조건이 이미 있는지 확인
      const checkQuery = `
      SELECT COUNT(*)
      FROM information_schema.TABLE_CONSTRAINTS tc
      JOIN information_schema.KEY_COLUMN_USAGE kcu
      ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
      WHERE tc.TABLE_SCHEMA = DATABASE() -- 현재 데이터베이스 선택
      AND tc.TABLE_NAME = 'runing_info_entity'
      AND tc.CONSTRAINT_TYPE = 'UNIQUE'
      AND kcu.COLUMN_NAME = 'slotId';
    `;

      const checkResult = await entityManager.query(checkQuery);

      // 제약 조건이 이미 존재하면 추가하지 않음
      if (checkResult[0]['COUNT(*)'] > 0) {
        console.log('UNIQUE 제약 조건이 이미 존재합니다.');
        return;
      }

      // UNIQUE 제약 조건 추가
      const addQuery = `
      ALTER TABLE runing_info_entity 
      ADD CONSTRAINT unique_slotId UNIQUE (slotId);
    `;

      await entityManager.query(addQuery);

      console.log('slotId에 UNIQUE 제약 조건이 추가되었습니다.');
    } catch (error) {
      console.log('오류 발생:', error.message);
    }
  }

  async create(
    createDto: CreateRuningInfoDto,
  ): Promise<RuningInfoEntity | null> {
    const { runingInfoDtoItems } = createDto;

    // 입력받은 analyzedDttm 값을 moment 객체로 변환 (형식: YYYYMMDDHHmm)
    const analyzedDttm = moment(
      runingInfoDtoItems.analyzedDttm, // 첫 번째 요소로 접근
      'YYYYMMDDHHmm',
    );

    // 앞뒤 1시간 범위 계산
    const startDttm = analyzedDttm.clone().subtract(1, 'hours'); // 1시간 전
    const endDttm = analyzedDttm.clone().add(1, 'hours'); // 1시간 후

    // 시작 시간과 끝 시간을 다시 문자열로 변환
    const startDttmStr = startDttm.format('YYYYMMDDHHmm');
    const endDttmStr = endDttm.format('YYYYMMDDHHmm');

    return await this.dataSource.transaction(async (manager) => {
      // 동일한 slotId와 analyzedDttm의 앞뒤 1시간 내의 데이터가 있는지 확인
      const existingEntity = await manager.findOne(RuningInfoEntity, {
        where: {
          slotId: runingInfoDtoItems.slotId, // 첫 번째 요소로 접근
          analyzedDttm: Between(startDttmStr, endDttmStr), // 1시간 범위 내에서 조회
        },
      });

      if (existingEntity) {
        console.log(
          '동일 슬롯아이디 및 1시간 범위 내 analyzedDttm 존재, 저장 x',
        );
        return null;
      }

      // 새로운 엔티티 생성
      const entity = manager.create(RuningInfoEntity, {
        ...runingInfoDtoItems, // 첫 번째 요소로 접근
      });

      // 엔티티 저장
      return await manager.save(entity);
    });
  }

  async findBySlotNo(slotId: string): Promise<RuningInfoEntity | undefined> {
    return this.runingInfoEntityRepository.findOne({ where: { slotId } });
  }

  async update(updateDto: UpdateRuningInfoDto): Promise<RuningInfoEntity[]> {
    const { runingInfoDtoItems } = updateDto;

    const updatedItems: RuningInfoEntity[] = [];
    for (const item of runingInfoDtoItems) {
      const existingEntity = await this.runingInfoEntityRepository.findOne({
        where: { id: item.id },
      });

      if (existingEntity) {
        Object.assign(existingEntity, item);
        await this.runingInfoEntityRepository.save(existingEntity);
        updatedItems.push(existingEntity);
      }
    }

    return updatedItems;
  }


  async delete(
    ids: string[],
    rootPaths: string[],
    apiUrl: string,
  ): Promise<boolean> {
    await this.cleanBrowserCache();

    try {
      await this.runingInfoEntityRepository.delete({ id: In(ids) });

      const promises = rootPaths.map((rootPath: string) => {
        return new Promise<boolean>((resolve, reject) => {
          exec(`rmdir /s /q "${rootPath}"`, (error) => {
            if (error) {
              console.error(
                `Fail to delete folder at ${rootPath}: ${error.message}`,
              );
              reject(false);
            } else {
              console.log(
                `Folder at ${rootPath} has been deleted successfully`,
              );
              resolve(true);
            }
          });
        });
      });

      await Promise.all(promises);
      // await this.runFileExpressServer(rootPaths, apiUrl);
      return true;
    } catch (error) {
      console.error('Error while deleting entities:', error);
      return false; // 삭제 실패
    }
  }

  async findAllWithPagingAndFilter(
    page: number,
    pageSize: number,
    startDay?: Date,
    endDay?: Date,
    barcodeNo?: string,
    patientId?: string,
    patientNm?: string,
    nrCount?: string,
    titles?: string[],
    testType?: string,
    wbcCountOrder?: string,
  ): Promise<{ data: RuningInfoEntity[]; total: number }> {
    const queryBuilder =
      this.runingInfoEntityRepository.createQueryBuilder('runInfo');

    const startFormatted = startDay
      ? `${startDay.getFullYear()}${(startDay.getMonth() + 1).toString().padStart(2, '0')}${startDay.getDate().toString().padStart(2, '0')}000000000`
      : undefined;
    const endFormatted = endDay
      ? `${endDay.getFullYear()}${(endDay.getMonth() + 1).toString().padStart(2, '0')}${endDay.getDate().toString().padStart(2, '0')}235959999`
      : undefined;

    if (startFormatted || endFormatted) {
      queryBuilder.andWhere(
        startFormatted && endFormatted
          ? 'runInfo.analyzedDttm BETWEEN :startDay AND :endDay'
          : startFormatted
            ? 'runInfo.analyzedDttm >= :startDay'
            : 'runInfo.analyzedDttm <= :endDay',
        {
          startDay: startFormatted,
          endDay: endFormatted,
        },
      );
    }

    queryBuilder.orderBy('runInfo.analyzedDttm', 'DESC');

    if (barcodeNo) {
      queryBuilder.andWhere('runInfo.barcodeNo LIKE :barcodeNo', {
        barcodeNo: `%${barcodeNo}%`,
      });
    }

    if (patientId) {
      queryBuilder.andWhere('runInfo.patientId LIKE :patientId', {
        patientId: `%${patientId}%`,
      });
    }

    if (patientNm) {
      queryBuilder.andWhere('runInfo.patientNm LIKE :patientNm', {
        patientNm: `%${patientNm}%`,
      });
    }

    if (testType) {
      queryBuilder.andWhere('runInfo.testType = :testType', { testType });
    }

    if (nrCount !== '0' && nrCount !== '') {
      const query = `
    JSON_SEARCH(runInfo.wbcInfoAfter, 'one', :titlePath, NULL, '$[*].title') IS NOT NULL
    AND (
      SELECT COUNT(*)
      FROM JSON_TABLE(
        runInfo.wbcInfoAfter,
        '$[*]' COLUMNS(
          title VARCHAR(255) PATH '$.title',
          count INT PATH '$.count'
        )
      ) AS jt
      WHERE jt.title = :titleParam
        AND jt.count = :nrCount
    ) > 0
  `;
      queryBuilder.andWhere(query, {
        titlePath: 'NR',
        titleParam: 'NR',
        nrCount: parseInt(nrCount, 10),
      });
    }

    if (titles && titles.length > 0) {
      const andConditions = titles
        .map((title, index) => {
          const titleParam = `title${index}`;
          return `
        JSON_SEARCH(runInfo.wbcInfoAfter, 'one', :${titleParam}, NULL, '$[*].title') IS NOT NULL
        AND (
          SELECT COUNT(*)
          FROM JSON_TABLE(
            runInfo.wbcInfoAfter,
            '$[*]' COLUMNS(
              title VARCHAR(255) PATH '$.title',
              count INT PATH '$.count'
            )
          ) AS jt
          WHERE jt.title = :${titleParam}
            AND jt.count > 0
        ) > 0
      `;
        })
        .join(' AND ');

      const params = titles.reduce((acc, title, index) => {
        acc[`title${index}`] = title;
        return acc;
      }, {});

      queryBuilder.andWhere(andConditions, params);
    }

    // eslint-disable-next-line prefer-const
    let [data, total] = await queryBuilder.getManyAndCount();

    if (wbcCountOrder) {
      data.sort((a, b) => {
        const aCount = Number(a.wbcCount);
        const bCount = Number(b.wbcCount);
        return wbcCountOrder.toUpperCase() === 'ASC'
          ? aCount - bCount
          : bCount - aCount;
      });
    }
    if (pageSize && page) {
      data = data.slice((page - 1) * pageSize, page * pageSize);
    }

    return { data, total };
  }

  async getUpDownRunnInfo(
    id: number,
    type: string,
    nrCount?: string,
    titles?: string[],
    startDay?: Date,
    endDay?: Date,
    barcodeNo?: string,
    testType?: string,
  ): Promise<Partial<RuningInfoEntity> | null> {
    const entityManager: EntityManager =
      this.runingInfoEntityRepository.manager;
    const queryBuilder =
      this.runingInfoEntityRepository.createQueryBuilder('runInfo');

    // 현재 엔티티 존재 여부 확인
    const currentEntityResult = await entityManager.query(
      'SELECT id FROM runing_info_entity WHERE id = ?',
      [id],
    );

    if (currentEntityResult.length === 0) {
      return null;
    }

    // 날짜 조건 포맷팅
    const startFormatted = startDay
      ? `${startDay.getFullYear()}${(startDay.getMonth() + 1).toString().padStart(2, '0')}${startDay.getDate().toString().padStart(2, '0')}000000000`
      : undefined;
    const endFormatted = endDay
      ? `${endDay.getFullYear()}${(endDay.getMonth() + 1).toString().padStart(2, '0')}${endDay.getDate().toString().padStart(2, '0')}235959999`
      : undefined;

    if (startFormatted) {
      queryBuilder.andWhere('runInfo.analyzedDttm >= :startDay', {
        startDay: startFormatted,
      });
    }
    if (endFormatted) {
      queryBuilder.andWhere('runInfo.analyzedDttm <= :endDay', {
        endDay: endFormatted,
      });
    }

    // 바코드 번호 조건
    if (barcodeNo) {
      queryBuilder.andWhere('runInfo.barcodeNo LIKE :barcodeNo', {
        barcodeNo: `%${barcodeNo}%`,
      });
    }

    // 테스트 타입 조건
    if (testType) {
      queryBuilder.andWhere('runInfo.testType = :testType', { testType });
    }

    // 타입에 따른 조건 설정
    if (type === 'up') {
      queryBuilder
        .andWhere('runInfo.id > :id', { id })
        .orderBy('runInfo.id', 'ASC');
    } else if (type === 'down') {
      queryBuilder
        .andWhere('runInfo.id < :id', { id })
        .orderBy('runInfo.id', 'DESC');
    }

    // NR 조건 추가
    if (nrCount && nrCount !== '0') {
      queryBuilder.andWhere(
        `JSON_SEARCH(runInfo.wbcInfoAfter, 'one', 'NR', NULL, '$[*].title') IS NOT NULL
       AND (
         SELECT COUNT(*)
         FROM JSON_TABLE(
           runInfo.wbcInfoAfter,
           '$[*]' COLUMNS(
             title VARCHAR(255) PATH '$.title',
             count INT PATH '$.count'
           )
         ) AS jt
         WHERE jt.title = 'NR' AND jt.count = :nrCount
       ) > 0`,
        { nrCount: parseInt(nrCount, 10) },
      );
    }

    // Titles 조건 추가 (AND 조건)
    if (titles && titles.length > 0) {
      titles.forEach((title, index) => {
        queryBuilder.andWhere(
          `JSON_SEARCH(runInfo.wbcInfoAfter, 'one', :title${index}, NULL, '$[*].title') IS NOT NULL
         AND (
           SELECT COUNT(*)
           FROM JSON_TABLE(
             runInfo.wbcInfoAfter,
             '$[*]' COLUMNS(
               title VARCHAR(255) PATH '$.title',
               count INT PATH '$.count'
             )
           ) AS jt
           WHERE jt.title = :title${index}
             AND jt.count > 0
         ) > 0`,
          { [`title${index}`]: title },
        );
      });
    }

    // 쿼리 실행
    const result = await queryBuilder.getRawOne();

    if (result) {
      // Prefix 제거 후 반환
      const cleanedResult: Partial<RuningInfoEntity> = {};
      Object.keys(result).forEach((key) => {
        const cleanedKey = key.replace(/^runInfo_/, '');
        cleanedResult[cleanedKey] = result[key];
      });
      return cleanedResult;
    }

    // 조건을 만족하지 않을 경우 다음 항목 반환
    const directionQuery =
      type === 'up'
        ? 'SELECT * FROM runing_info_entity WHERE id > ? ORDER BY id ASC LIMIT 1'
        : 'SELECT * FROM runing_info_entity WHERE id < ? ORDER BY id DESC LIMIT 1';

    const nextResult = await entityManager.query(directionQuery, [id]);
    if (nextResult.length > 0) {
      const cleanedNextResult: Partial<RuningInfoEntity> = {};
      Object.keys(nextResult[0]).forEach((key) => {
        const cleanedKey = key.replace(/^runInfo_/, '');
        cleanedNextResult[cleanedKey] = nextResult[0][key];
      });
      return cleanedNextResult;
    }

    return null;
  }

  async clearPcIpAndSetStateFalse(pcIp: string): Promise<void> {
    try {
      console.log(pcIp);
      // PC IP가 주어진 값인 엔터티를 선택
      const entityWithPcIp = await this.runingInfoEntityRepository.findOne({
        where: { pcIp },
      });

      if (!entityWithPcIp) {
        console.error(`Entity with PC IP ${pcIp} not found`);
        return;
      }

      // PC IP를 빈 문자열로 변경
      entityWithPcIp.pcIp = '';

      // 상태를 false로 변경
      entityWithPcIp.lock_status = false;

      // 변경된 엔터티를 저장
      await this.runingInfoEntityRepository.save(entityWithPcIp);
    } catch (error) {
      console.error(
        'Error while clearing PC IP and setting state to false:',
        error,
      );
    }
  }

  async getRunningInfoById(id: number): Promise<RuningInfoEntity | null> {
    const entity = await this.runingInfoEntityRepository.findOne({
      where: { id },
    });
    console.log(Array.isArray(entity.rbcInfo));
    return entity || null;
  }

  async getRunningInfoClassDetail(
    id: number,
  ): Promise<RuningInfoEntity | null> {
    const entityManager: EntityManager =
      this.runingInfoEntityRepository.manager;

    const query = `
      SELECT 
        id,
        slotId,
        wbcInfoAfter,
        testType,
        barcodeNo,
        patientId,
        cbcPatientNo,
        cbcPatientNm,
        submitState,
        cbcSex,
        cbcAge,
        hosName,
        analyzedDttm,
        wbcInfo,
        img_drive_root_path,
        rbcInfoAfter,
        wbcMemo
      FROM 
        runing_info_entity
      WHERE 
        id = ?`;

    const result = await entityManager.query(query, [id]);

    if (result.length > 0) {
      return result[0] as RuningInfoEntity;
    } else {
      return null;
    }
  }

  async getRunningInfoClassInfo(id: number): Promise<RuningInfoEntity | null> {
    const entityManager: EntityManager =
      this.runingInfoEntityRepository.manager;

    const query = `
      SELECT 
        id,
        wbcInfoAfter,
        wbcInfo,
        testType,
        submitState,
        img_drive_root_path,
        rbcInfoAfter,
        wbcMemo,
        barcodeNo
      FROM 
        runing_info_entity
      WHERE 
        id = ?`;

    const result = await entityManager.query(query, [id]);

    if (result.length > 0) {
      return result[0] as RuningInfoEntity;
    } else {
      return null;
    }
  }

  async getRunningInfoClassInfoMenu(
    id: number,
  ): Promise<RuningInfoEntity | null> {
    const entityManager: EntityManager =
      this.runingInfoEntityRepository.manager;

    const query = `
      SELECT 
        id,
        lock_status,
        wbcInfoAfter,
        wbcInfo,
        testType,
        img_drive_root_path,
        rbcInfoAfter,
        wbcMemo
      FROM 
        runing_info_entity
      WHERE 
        id = ?`;

    const result = await entityManager.query(query, [id]);

    if (result.length > 0) {
      return result[0] as RuningInfoEntity;
    } else {
      return null;
    }
  }

  async updatePcIpAndState(
    oldPcIp: string,
    newEntityId: number,
    newPcIp: string,
  ): Promise<void> {
    // 동일한 pcIp를 가진 모든 엔티티 업데이트
    await this.runingInfoEntityRepository.update(
      { pcIp: oldPcIp },
      { pcIp: '', lock_status: false },
    );

    // 새로운 엔티티 업데이트
    await this.runingInfoEntityRepository.update(
      { id: newEntityId },
      { pcIp: newPcIp, lock_status: true },
    );
  }

  async clearPcIpAndState(oldPcIp: string): Promise<void> {
    await this.runingInfoEntityRepository.update(
      { pcIp: oldPcIp },
      { pcIp: '', lock_status: false },
    );
  }

  async redisAllClear(): Promise<void> {
    this.redis.flushall();
  }

  private cleanBrowserCache() {
    return new Promise((resolve, reject) => {
      exec(
        'powershell.exe -Command "Get-ChildItem \\"$env:LOCALAPPDATA\\Microsoft\\Edge\\User Data\\" -Directory | ForEach-Object { Remove-Item -Path \\"$($_.FullName)\\Cache\\Cache_Data\\f_*\\" -Recurse -ErrorAction SilentlyContinue }"',
        (error, stdout, stderr) => {
          if (error) {
            return reject(error);
          }
          if (stderr) {
            console.log(`browser cache clean warning: ${stderr}`);
          }
          resolve(stdout);
        },
      );
    });
  }

  private async runFileExpressServer(task: any, apiUrl: string) {
    const expressServer = spawn('npm', ['start'], {
      cwd: this.fileOperationExpressServerPath,
      stdio: 'inherit',
      shell: true,
    });

    expressServer.on('close', (code) => {
      console.log(`Express 서버가 종료되었습니다. 종료 코드: ${code}`);
    });

    try {
      await axios.post(`${apiUrl}:3010/file-delete`, { task });
    } catch (error) {
      console.error('파일 삭제 중 오류 발생: ', error);
    }

    expressServer.kill();
  }
}
