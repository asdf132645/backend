// runing-info.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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

  async update(updateDto: UpdateRuningInfoDto): Promise<RuningInfoEntity[]> {
    const { runingInfoDtoItems } = updateDto;

    const updatedItems: RuningInfoEntity[] = [];
    console.log('runingInfoDtoItems', runingInfoDtoItems);
    for (const item of runingInfoDtoItems) {
      const existingEntity = await this.runingInfoEntityRepository.findOne({
        where: { id: item.id },
      });
      console.log('item.id', item.id);
      console.log('existingEntity', existingEntity);
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
        // existingEntity.wbcInfo = this.mapWbcInfo(item.wbcInfo);

        // wbcInfoAfter 매핑
        existingEntity.wbcInfoAfter = this.mapWbcInfoAfter(item.wbcInfoAfter);

        // RbcInfoDto 매핑
        existingEntity.rbcInfo = this.mapRbcInfo(item.rbcInfo);

        // ProcessInfoDto 매핑
        existingEntity.processInfo = this.mapProcessInfo(item.processInfo);

        // OrderDto 매핑
        existingEntity.orderList = this.mapOrderList(item.orderList);

        existingEntity.signedState = item.signedState;
        existingEntity.signedOfDate = item.signedOfDate;
        existingEntity.signedUserId = item.signedUserId;
        existingEntity.classificationResult = this.mapClassificationResult(
          item.classificationResult,
        );
        // 엔터티를 업데이트하고 업데이트된 엔터티를 배열에 추가
        await this.runingInfoEntityRepository.save(existingEntity);
        updatedItems.push(existingEntity);
      }
    }

    return updatedItems;
  }

  async findAllWithPagingAndFilter(
    page: number,
    pageSize: number,
    startDay?: Date,
    endDay?: Date,
    barcodeNo?: string,
    patientId?: string,
    patientNm?: string,
  ): Promise<{ data: RuningInfoEntity[]; total: number }> {
    const whereClause: any = {};
    if (startDay && endDay) {
      whereClause.analyzedDttm = Between(startDay, endDay);
    }

    if (barcodeNo) {
      whereClause.barcodeNo = barcodeNo;
    }

    if (patientId) {
      whereClause.patientId = patientId;
    }

    if (patientNm) {
      whereClause.patientNm = patientNm;
    }
    const [data, total] = await this.runingInfoEntityRepository.findAndCount({
      where: whereClause,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const formattedData = data.map((item: any) => ({
      ...item,
      orderDttm: this.formatDate(item.orderDttm),
      analyzedDttm: this.formatDate(item.analyzedDttm),
    }));

    return { data: formattedData, total };
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // private mapWbcInfo(wbcInfo: WbcInfoDto[]): any[] {
  //   console.log(wbcInfo);
  //   return wbcInfo.map((item) => ({
  //     categoryId: item.categoryId,
  //     categoryNm: item.categoryNm,
  //     classInfo: this.mapClassInfo(item.classInfo),
  //   }));
  // }

  private mapWbcInfoAfter(wbcInfoAfter: any[]): any[] {
    console.log(wbcInfoAfter);
    return wbcInfoAfter.map((item) => ({
      id: item.id,
      name: item.name,
      count: item.count,
      title: item.title,
      images: item.images || [], // images가 없을 경우 빈 배열로 기본값 설정
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

  private mapClassificationResult(classificationResult: any[]): any[] {
    return classificationResult.map((classItem) => ({
      count: classItem.count,
      dirName: classItem.dirName,
      title: classItem.title,
      analyzedDttm: classItem.analyzedDttm,
      percent: classItem.percent,
    }));
  }
}
