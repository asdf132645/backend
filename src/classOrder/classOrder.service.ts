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

  async getClassOrdersByUserName(userName: number): Promise<ClassOrderDto[]> {
    const classOrders = await this.classOrderRepository.find({
      where: { userName },
    });
    return classOrders.map(this.entityToDto);
  }

  async createClassOrder(
    createDtos: ClassOrderDto[],
  ): Promise<ClassOrderDto[]> {
    // DTO 배열을 엔터티 배열로 변환
    const classOrderEntities = createDtos.map((dto) => {
      const classOrderEntity = new ClassOrder();
      classOrderEntity.id = Number(dto.id);
      classOrderEntity.title = dto.title;
      classOrderEntity.name = dto.name;
      classOrderEntity.count = dto.count;
      classOrderEntity.percentText = dto.percentText;
      classOrderEntity.keyText = dto.keyText;
      classOrderEntity.orderText = dto.orderText;
      classOrderEntity.userName = dto.userName;
      classOrderEntity.classId = dto.classId;
      return classOrderEntity;
    });

    // 엔터티 배열을 한꺼번에 저장
    const savedClassOrders =
      await this.classOrderRepository.save(classOrderEntities);

    // 저장된 엔터티 배열을 DTO 배열로 변환하여 반환
    return savedClassOrders.map((savedOrder) => ({
      id: savedOrder.id.toString(),
      title: savedOrder.title,
      name: savedOrder.name,
      count: savedOrder.count,
      percentText: savedOrder.percentText,
      keyText: savedOrder.keyText,
      orderText: savedOrder.orderText,
      userName: savedOrder.userName,
      classId: savedOrder.classId,
    }));
  }

  async updateClassOrders(newData: ClassOrderDto[]): Promise<ClassOrderDto[]> {
    const updatedData: ClassOrderDto[] = [];

    // 새로운 데이터를 하나씩 처리하여 업데이트 또는 생성
    for (const dto of newData) {
      // userName과 id를 이용하여 기존 레코드를 찾음
      const existingRecord = await this.classOrderRepository.findOne({
        where: { userName: Number(dto.userName), id: Number(dto.id) },
      });

      if (existingRecord) {
        // 레코드가 존재하면 업데이트
        existingRecord.count = dto.count;
        existingRecord.percentText = dto.percentText;
        existingRecord.orderText = dto.orderText;
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
    const {
      id,
      title,
      name,
      count,
      percentText,
      keyText,
      orderText,
      userName,
      classId,
    } = classOrder;
    return {
      id: id.toString(),
      title,
      name,
      count,
      percentText,
      keyText,
      orderText,
      userName,
      classId,
    };
  }

  private dtoToEntity(dto: ClassOrderDto): ClassOrder {
    const {
      id,
      title,
      name,
      count,
      percentText,
      keyText,
      orderText,
      userName,
      classId,
    } = dto;
    const classOrderEntity = new ClassOrder();
    classOrderEntity.id = Number(id); // Assuming id is a number
    classOrderEntity.title = title;
    classOrderEntity.name = name;
    classOrderEntity.count = count;
    classOrderEntity.percentText = percentText;
    classOrderEntity.keyText = keyText;
    classOrderEntity.orderText = orderText;
    classOrderEntity.userName = userName;
    classOrderEntity.classId = classId;
    return classOrderEntity;
  }
}
