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
        classOrderEntity.id = Number(dto.id);
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

    // 새로운 데이터를 하나씩 처리하여 업데이트 또는 생성
    for (const dto of newData) {
      // id를 이용하여 기존 레코드를 찾음
      const existingRecord = await this.classOrderRepository.findOne({
        where: { id: Number(dto.id) },
      });

      if (existingRecord) {
        // 레코드가 존재하면 업데이트
        existingRecord.orderIdx = dto.orderIdx;
        await this.classOrderRepository.save(existingRecord);
        updatedData.push(this.entityToDto(existingRecord));
      } else {
        // 레코드가 존재하지 않으면 생성
        const createdRecord = await this.createClassOrder([dto]);
        if (createdRecord && createdRecord.length > 0) {
          updatedData.push(createdRecord[0]);
        }
      }
    }

    return updatedData;
  }

  private entityToDto(classOrder: ClassOrder): ClassOrderDto {
    const { id, abbreviation, fullNm, orderIdx } = classOrder;
    return {
      id: Number(id),
      abbreviation,
      fullNm,
      orderIdx,
    };
  }

  private dtoToEntity(dto: ClassOrderDto): ClassOrder {
    const { id, abbreviation, fullNm, orderIdx } = dto;
    const classOrderEntity = new ClassOrder();
    classOrderEntity.id = Number(id);
    classOrderEntity.abbreviation = abbreviation;
    classOrderEntity.fullNm = fullNm;
    classOrderEntity.orderIdx = orderIdx;
    return classOrderEntity;
  }
}
