// runing-info.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuningInfoEntity } from './runingInfo.entity';
import {
  WbcInfoDto,
  RbcInfoDto,
  ProcessInfoDto,
  OrderDto,
  ClassInfoDto,
  CreateRuningInfoDto,
  UpdateRuningInfoDto,
} from './dto/runingInfoDtoItems';

@Injectable()
export class RuningInfoService {
  constructor(
    @InjectRepository(RuningInfoEntity)
    private readonly runingInfoEntityRepository: Repository<RuningInfoEntity>,
  ) {}

  async create(createDto: CreateRuningInfoDto): Promise<RuningInfoEntity> {
    const { userId, runingInfoDtoItems } = createDto;

    const entity = this.runingInfoEntityRepository.create({
      userId,
      ...runingInfoDtoItems,
    });

    return await this.runingInfoEntityRepository.save(entity);
  }

  async update(
    userId: number,
    updateDto: UpdateRuningInfoDto,
  ): Promise<RuningInfoEntity[]> {
    const { runingInfoDtoItems } = updateDto;

    const updatedItems: RuningInfoEntity[] = [];

    for (const item of runingInfoDtoItems) {
      const existingEntity = await this.runingInfoEntityRepository.findOne({
        where: { userId, id: item.id },
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
        existingEntity.analyzedDttm = item.analyzedDttm;
        existingEntity.pltCount = item.pltCount;
        existingEntity.malariaCount = item.malariaCount;
        existingEntity.maxRbcCount = item.maxRbcCount;
        existingEntity.stateCd = item.stateCd;
        existingEntity.tactTime = item.tactTime;
        existingEntity.maxWbcCount = item.maxWbcCount;
        existingEntity.lowPowerPath = item.lowPowerPath;
        existingEntity.runningPath = item.runningPath;
        existingEntity.bminfo = item.bminfo;
        existingEntity.cassetId = item.cassetId;
        existingEntity.isNormal = item.isNormal;

        // WbcInfoDto 매핑
        existingEntity.wbcInfo = this.mapWbcInfo(item.wbcInfo);

        // RbcInfoDto 매핑
        existingEntity.rbcInfo = this.mapRbcInfo(item.rbcInfo);

        // ProcessInfoDto 매핑
        existingEntity.processInfo = this.mapProcessInfo(item.processInfo);

        // OrderDto 매핑
        existingEntity.orderList = this.mapOrderList(item.orderList);

        // 엔터티를 업데이트하고 업데이트된 엔터티를 배열에 추가
        await this.runingInfoEntityRepository.save(existingEntity);
        updatedItems.push(existingEntity);
      }
    }

    return updatedItems;
  }

  async findByUserId(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<{ data: RuningInfoEntity[]; total: number }> {
    const [data, total] = await this.runingInfoEntityRepository.findAndCount({
      where: { userId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { data, total };
  }

  private mapWbcInfo(wbcInfo: WbcInfoDto[]): any[] {
    return wbcInfo.map((item) => ({
      categoryId: item.categoryId,
      categoryNm: item.categoryNm,
      classInfo: this.mapClassInfo(item.classInfo),
    }));
  }

  private mapRbcInfo(rbcInfo: RbcInfoDto[]): any[] {
    return rbcInfo.map((item) => ({
      title: item.title,
      name: item.name,
      count: item.count,
      images: item.images,
    }));
  }

  private mapClassInfo(classInfo: ClassInfoDto[]): any[] {
    return classInfo.map((info) => ({
      classId: info.classId,
      classNm: info.classNm,
      degree: info.degree,
    }));
  }

  private mapProcessInfo(processInfo: ProcessInfoDto): any {
    return {
      cassetteNo: processInfo.cassetteNo,
      barcodeId: processInfo.barcodeId,
      patientId: processInfo.patientId,
      patientName: processInfo.patientName,
      wbcCount: processInfo.wbcCount,
      orderDate: processInfo.orderDate,
      analyzedDttm: processInfo.analyzedDttm,
    };
  }

  private mapOrderList(orderList: OrderDto[]): any[] {
    return orderList.map((order) => ({
      barcodeId: order.barcodeId,
      patientName: order.patientName,
      orderDate: order.orderDate,
      analyzedDttm: order.analyzedDttm,
      state: order.state,
    }));
  }
}
