// runing-info.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RuningInfoEntity } from './runingInfo.entity';

import {
  CreateRuningInfoDto,
  UpdateRuningInfoDto,
} from './dto/runingInfoDtoItems';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RuningInfoService {
  constructor(
    @InjectRepository(RuningInfoEntity)
    private readonly runingInfoEntityRepository: Repository<RuningInfoEntity>,
  ) {}

  async create(createDto: CreateRuningInfoDto): Promise<RuningInfoEntity> {
    const { runingInfoDtoItems } = createDto;

    // 동일한 slotId가 존재하는지 확인
    const existingEntity = await this.runingInfoEntityRepository.findOne({
      where: {
        slotId: runingInfoDtoItems.slotId,
      },
    });

    // 동일한 slotId가 존재하는 경우 아무 조치도 하지 않고 메서드를 종료
    if (existingEntity) {
      console.log('동일 슬롯아이디 존재 저장 x');
      return null;
    }

    // 동일한 slotId가 존재하지 않는 경우 엔티티를 생성
    const entity = this.runingInfoEntityRepository.create({
      ...runingInfoDtoItems,
    });

    return await this.runingInfoEntityRepository.save(entity);
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
        // existingEntity.stateCd = item.stateCd;
        existingEntity.tactTime = item.tactTime;
        existingEntity.maxWbcCount = item.maxWbcCount;
        existingEntity.bf_lowPowerPath = item.bf_lowPowerPath;
        // existingEntity.runningPath = item.runningPath;
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
    try {
      console.log(ids);
      const result = await this.runingInfoEntityRepository.delete({
        id: In(ids),
      });

      if (result.affected > 0) {
        for (const rootPath of rootPaths) {
          // 폴더 삭제
          try {
            fs.rmdirSync(rootPath, { recursive: true });
            console.log(`Folder at ${rootPath} has been deleted successfully`);
          } catch (error) {
            console.error(`Failed to delete folder at ${rootPath}:`, error);
            // throw new Error('Folder deletion failed');
          }
        }
      }
      return result.affected > 0; // affected가 0보다 크면 성공
    } catch (error) {
      console.error('Error while deleting entities:', error);
      return false; // 삭제 실패
    }
  }
  private deleteFolderRecursive(folderPath: string) {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file) => {
        const curPath = path.join(folderPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          this.deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
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
      queryBuilder.andWhere('runInfo.barcodeNo = :barcodeNo', { barcodeNo });
    }

    if (patientId) {
      queryBuilder.andWhere('runInfo.patientId = :patientId', { patientId });
    }

    if (patientNm) {
      queryBuilder.andWhere('runInfo.patientNm LIKE :patientNm', {
        patientNm: `%${patientNm}%`,
      });
    }

    if (testType) {
      queryBuilder.andWhere('runInfo.testType = :testType', { testType });
    }

    if (nrCount !== '0') {
      queryBuilder.andWhere('runInfo.wbcCount LIKE :nrCount', {
        nrCount: `%{"title": "NR", "count": "${nrCount}"}%`,
      });
    }

    if (titles && titles.length > 0) {
      titles.forEach((title, index) => {
        queryBuilder.andWhere(`runInfo.wbcCount LIKE :title${index}`, {
          [`title${index}`]: `%{"title": "${title}"%`,
        });
      });
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
    return entity || null;
  }

  async getUpDownRunnInfo(
    id: number,
    step: number,
    type: string,
  ): Promise<RuningInfoEntity | null> {
    // 현재 엔티티를 찾기
    const currentEntity = await this.runingInfoEntityRepository.findOne({
      where: { id },
    });
    if (!currentEntity) {
      return null;
    }

    let newEntity: RuningInfoEntity | null = null;

    if (type === 'up') {
      // 현재 id보다 큰 id를 가진 항목 중 step번째 항목 찾기
      newEntity = await this.runingInfoEntityRepository
        .createQueryBuilder('entity')
        .where('entity.id > :id', { id })
        .orderBy('entity.id', 'ASC')
        .offset(step - 1) // step 만큼 건너뜀
        .limit(1) // 하나의 항목만 가져옴
        .getOne();
    } else if (type === 'down') {
      // 현재 id보다 작은 id를 가진 항목 중 step번째 항목 찾기
      newEntity = await this.runingInfoEntityRepository
        .createQueryBuilder('entity')
        .where('entity.id < :id', { id })
        .orderBy('entity.id', 'DESC')
        .offset(step - 1) // step 만큼 건너뜀
        .limit(1) // 하나의 항목만 가져옴
        .getOne();
    }

    return newEntity || null;
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
}
