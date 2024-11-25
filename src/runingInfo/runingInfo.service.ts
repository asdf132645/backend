// runing-info.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  In,
  Repository,
  EntityManager,
  DataSource,
  Between,
} from 'typeorm';
import { RuningInfoEntity } from './runingInfo.entity';
import * as moment from 'moment';

import {
  CreateRuningInfoDto,
  UpdateRuningInfoDto,
} from './dto/runingInfoDtoItems';
import { LoggerService } from '../logger.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { exec } from 'child_process';

@Injectable()
export class RuningInfoService {
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
        // 엔터티의 속성 업데이트
        existingEntity.slotNo = item.slotNo;
        existingEntity.barcodeNo = item.barcodeNo;
        existingEntity.patientId = item.patientId;
        existingEntity.patientNm = item.patientNm;
        existingEntity.gender = item.gender;
        existingEntity.birthDay = item.birthDay;
        existingEntity.wbcCount = item.wbcCount;
        existingEntity.slotId = item.slotId;
        existingEntity.orderDttm = item.orderDttm;
        existingEntity.testType = item.testType;
        existingEntity.cbcPatientNo = item.cbcPatientNo;
        existingEntity.cbcPatientNm = item.cbcPatientNm;
        existingEntity.cbcSex = item.cbcSex;
        existingEntity.cbcAge = item.cbcAge;
        existingEntity.hosName = item.hosName;
        existingEntity.tactTime = item.tactTime;
        existingEntity.maxWbcCount = item.maxWbcCount;
        existingEntity.bf_lowPowerPath = item.bf_lowPowerPath;
        existingEntity.cassetId = item.cassetId;
        existingEntity.isNormal = item.isNormal;
        existingEntity.wbcMemo = item.wbcMemo;
        existingEntity.rbcMemo = item.rbcMemo;
        existingEntity.lock_status = item.lock_status;
        existingEntity.pcIp = item.pcIp;
        existingEntity.rbcInfoAfter = item.rbcInfoAfter;
        existingEntity.wbcInfoAfter = item.wbcInfoAfter;
        existingEntity.submitState = item.submitState;
        existingEntity.submitOfDate = item.submitOfDate;
        existingEntity.submitUserId = item.submitUserId;
        existingEntity.img_drive_root_path = item.img_drive_root_path;
        await this.runingInfoEntityRepository.save(existingEntity);
        updatedItems.push(existingEntity);
      }
    }

    return updatedItems;
  }

  async delete(ids: string[], rootPaths: string[]): Promise<boolean> {
    await this.cleanBrowserCache();

    try {
      const result = await this.runingInfoEntityRepository.delete({
        id: In(ids),
      });

      if (result.affected > 0) {
        for (const rootPath of rootPaths) {
          exec(`rmdir /s /q "${rootPath}"`, (error) => {
            if (error) {
              console.error(
                `Failed to delete folder at ${rootPath}:`,
                error.message,
              );
            } else {
              console.log(
                `Folder at ${rootPath} has been deleted successfully`,
              );
            }
          });
        }
      }
      return result.affected > 0; // affected가 0보다 크면 성공
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
      const orConditions = titles
        .map((title, index) => {
          const titleParam = `title${index}`;
          return `
            (JSON_SEARCH(runInfo.wbcInfoAfter, 'one', :${titleParam}, NULL, '$[*].title') IS NOT NULL
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
            ) > 0)
          `;
        })
        .join(' OR ');

      const params = titles.reduce((acc, title, index) => {
        acc[`title${index}`] = title;
        return acc;
      }, {});

      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where(orConditions, params);
        }),
      );
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

  async getUpDownRunnInfo(
    id: number,
    step: number,
    type: string,
  ): Promise<Partial<RuningInfoEntity> | null> {
    const entityManager: EntityManager =
      this.runingInfoEntityRepository.manager;

    // 현재 엔티티를 찾기
    const currentEntityQuery = `
      SELECT 
        id
      FROM 
        runing_info_entity
      WHERE 
        id = ?`;

    const currentEntityResult = await entityManager.query(currentEntityQuery, [
      id,
    ]);

    if (currentEntityResult.length === 0) {
      return null;
    }

    let newEntityQuery = '';
    if (type === 'up') {
      // 현재 id보다 큰 id를 가진 항목 중 step번째 항목 찾기
      newEntityQuery = `
        SELECT 
          id,
          analyzedDttm,
          barcodeNo,
          bf_lowPowerPath,
          birthDay,
          cassetId,
          cbcAge,
          hosName,
          cbcPatientNm,
          cbcPatientNo,
          cbcSex,
          gender,
          img_drive_root_path,
          isNormal,
          isNsNbIntegration,
          lock_status,
          maxWbcCount,
          orderDttm,
          patientId,
          patientNm,
          pcIp,
          rbcInfo,
          rbcInfoAfter,
          rbcMemo,
          slotId,
          slotNo,
          submitOfDate,
          submitState,
          submitUserId,
          tactTime,
          testType,
          traySlot,
          wbcCount,
          wbcInfoAfter,
          wbcInfo,
          wbcMemo
        FROM 
          runing_info_entity
        WHERE 
          id > ?
        ORDER BY 
          id ASC
        LIMIT 1 OFFSET ?`;
    } else if (type === 'down') {
      // 현재 id보다 작은 id를 가진 항목 중 step번째 항목 찾기
      newEntityQuery = `
        SELECT 
          id,
          analyzedDttm,
          barcodeNo,
          bf_lowPowerPath,
          birthDay,
          cassetId,
          cbcAge,
          hosName,
          cbcPatientNm,
          cbcPatientNo,
          cbcSex,
          gender,
          img_drive_root_path,
          isNormal,
          isNsNbIntegration,
          lock_status,
          maxWbcCount,
          orderDttm,
          patientId,
          patientNm,
          pcIp,
          rbcInfo,
          rbcInfoAfter,
          rbcMemo,
          slotId,
          slotNo,
          submitOfDate,
          submitState,
          submitUserId,
          tactTime,
          testType,
          traySlot,
          wbcCount,
          wbcInfoAfter,
          wbcInfo,
          wbcMemo
        FROM 
          runing_info_entity
        WHERE 
          id < ?
        ORDER BY 
          id DESC
        LIMIT 1 OFFSET ?`;
    }

    const newEntityResult = await entityManager.query(newEntityQuery, [
      id,
      step - 1,
    ]);

    if (newEntityResult.length > 0) {
      const result = newEntityResult[0];
      return {
        id: result.id,
        analyzedDttm: result.analyzedDttm,
        barcodeNo: result.barcodeNo,
        bf_lowPowerPath: result.bf_lowPowerPath,
        birthDay: result.birthDay,
        cassetId: result.cassetId,
        cbcAge: result.cbcAge,
        hosName: result.hosName,
        cbcPatientNm: result.cbcPatientNm,
        cbcPatientNo: result.cbcPatientNo,
        cbcSex: result.cbcSex,
        gender: result.gender,
        img_drive_root_path: result.img_drive_root_path,
        isNormal: result.isNormal,
        isNsNbIntegration: result.isNsNbIntegration,
        lock_status: result.lock_status,
        maxWbcCount: result.maxWbcCount,
        orderDttm: result.orderDttm,
        patientId: result.patientId,
        patientNm: result.patientNm,
        pcIp: result.pcIp,
        rbcInfo: result.rbcInfo,
        rbcInfoAfter: result.rbcInfoAfter,
        rbcMemo: result.rbcMemo,
        slotId: result.slotId,
        slotNo: result.slotNo,
        submitOfDate: result.submitOfDate,
        submitState: result.submitState,
        submitUserId: result.submitUserId,
        tactTime: result.tactTime,
        testType: result.testType,
        traySlot: result.traySlot,
        wbcCount: result.wbcCount,
        wbcInfoAfter: result.wbcInfoAfter,
        wbcInfo: result.wbcInfo,
        wbcMemo: result.wbcMemo,
      } as Partial<RuningInfoEntity>;
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
}
