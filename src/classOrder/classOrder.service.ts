import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassOrder } from './classOrder';
import { ClassOrderDto } from './dto/classOrder.dto';

@Injectable()
export class ClassOrderService {
  constructor(
    @InjectRepository(ClassOrder)
    private classOrderRepository: Repository<ClassOrder>,
  ) {}

  async getClassOrders(): Promise<ClassOrderDto[]> {
    const classOrders = await this.classOrderRepository.find();
    return classOrders.map(this.entityToDto);
  }

  async createClassOrder(
    createDtos: ClassOrderDto[],
  ): Promise<ClassOrderDto[]> {
    // 새로운 주문을 저장할 배열
    const newClassOrders: ClassOrder[] = [];

    for (const dto of createDtos) {
      // 이미 존재하는 주문인지 확인
      const existingOrder = await this.classOrderRepository.find();

      if (existingOrder.length === 0 || !existingOrder) {
        // 존재하지 않는 경우 새로운 주문 생성
        const classOrderEntity = new ClassOrder();
        classOrderEntity.classId = dto.classId;
        classOrderEntity.abbreviation = dto.abbreviation;
        classOrderEntity.fullNm = dto.fullNm;
        classOrderEntity.orderIdx = dto.orderIdx;

        newClassOrders.push(classOrderEntity);
      }
    }

    // 새로운 주문을 데이터베이스에 저장
    const savedClassOrders =
      await this.classOrderRepository.save(newClassOrders);
    return savedClassOrders;
  }

  async updateClassOrders(newData: ClassOrderDto[]): Promise<ClassOrderDto[]> {
    const updatedData: ClassOrderDto[] = [];

    for (const dto of newData) {
      try {
        const existingRecord = await this.classOrderRepository.findOne({
          where: { abbreviation: dto.abbreviation },
        });

        if (existingRecord) {
          console.log(existingRecord);
          // 기존 레코드가 있으면 업데이트
          existingRecord.orderIdx = String(dto.orderIdx);
          existingRecord.abbreviation = dto.abbreviation;
          existingRecord.fullNm = dto.fullNm;
          existingRecord.classId = dto.classId;
          await this.classOrderRepository.save(existingRecord);
          updatedData.push(this.entityToDto(existingRecord));
        } else {
          // 기존 레코드가 없으면 새로 생성
          const createdRecord = await this.createClassOrder([dto]);
          if (createdRecord && createdRecord.length > 0) {
            updatedData.push(createdRecord[0]);
          }
        }
      } catch (error) {
        console.error(`Failed to process dto with id ${dto.id}:`, error);
      }
    }

    return updatedData;
  }

  private entityToDto(classOrder: ClassOrder): ClassOrderDto {
    const { abbreviation, fullNm, orderIdx, classId } = classOrder;
    return {
      abbreviation,
      fullNm,
      orderIdx,
      classId,
    };
  }
}
