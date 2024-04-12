import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassOrderEntity } from './classOrder.entity';
import { ClassOrderDto } from './dto/classOrder.dto';

@Injectable()
export class ClassOrderService {
  constructor(
    @InjectRepository(ClassOrderEntity)
    private classOrderRepository: Repository<ClassOrderEntity>,
  ) {}

  async getAllClassOrders(): Promise<ClassOrderDto[]> {
    const classOrders = await this.classOrderRepository.find();
    return classOrders.map(this.entityToDto);
  }

  async createClassOrder(createDto: ClassOrderDto): Promise<ClassOrderDto> {
    const classOrderEntity = this.dtoToEntity(createDto);
    const savedClassOrder =
      await this.classOrderRepository.save(classOrderEntity);
    return this.entityToDto(savedClassOrder);
  }

  async updateClassOrder(
    id: number,
    updateDto: ClassOrderDto,
  ): Promise<ClassOrderDto | null> {
    const classOrder = await this.classOrderRepository.findOne({
      where: { id },
    });
    if (!classOrder) return null;

    classOrder.count = updateDto.count;
    classOrder.percentText = updateDto.percentText;

    await this.classOrderRepository.save(classOrder);
    return this.entityToDto(classOrder);
  }

  private entityToDto(classOrder: ClassOrderEntity): ClassOrderDto {
    const { id, title, name, count, percentText, keyText, orderText } =
      classOrder;
    return {
      id: id.toString(),
      title,
      name,
      count,
      percentText,
      keyText,
      orderText,
    };
  }

  private dtoToEntity(dto: ClassOrderDto): ClassOrderEntity {
    const { id, title, name, count, percentText, keyText, orderText } = dto;
    const classOrderEntity = new ClassOrderEntity();
    classOrderEntity.id = Number(id); // Assuming id is a number
    classOrderEntity.title = title;
    classOrderEntity.name = name;
    classOrderEntity.count = count;
    classOrderEntity.percentText = percentText;
    classOrderEntity.keyText = keyText;
    classOrderEntity.orderText = orderText;
    return classOrderEntity;
  }
}
