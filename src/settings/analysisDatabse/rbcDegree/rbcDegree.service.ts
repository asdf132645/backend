// src/rbcDegree/rbcDegree.service.ts
import { Injectable } from '@nestjs/common';
import { RbcDegreeDto } from './dto/rbcDegree.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RbcDegree } from './rbcDegree.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RbcDegreeService {
  constructor(
    @InjectRepository(RbcDegree)
    private readonly rbcDegreeRepository: Repository<RbcDegree>,
  ) {}

  async create(rbcDegreeDto: RbcDegreeDto[]): Promise<void> {
    // 카테고리 엔터티 생성 및 저장
    const categories = rbcDegreeDto.map((categoryDto) => {
      const category = this.rbcDegreeRepository.create({ ...categoryDto });
      return category;
    });

    await this.rbcDegreeRepository.save(categories);
  }

  async update(updateRbcDegreeDto: RbcDegreeDto[]): Promise<RbcDegreeDto[]> {
    const updatedItems: RbcDegreeDto[] = [];
    for (const item of updateRbcDegreeDto) {
      const updatedItem = await this.updateItem(item);
      if (updatedItem) {
        updatedItems.push(updatedItem);
      }
    }
    return updatedItems;
  }

  private async updateItem(item: RbcDegreeDto): Promise<RbcDegreeDto> {
    const existingRbcDegree = await this.rbcDegreeRepository.findOne({
      where: {
        categoryId: item.categoryId,
        classId: item.classId,
        classNm: item.classNm,
      },
    });

    if (existingRbcDegree) {
      await this.rbcDegreeRepository.update(existingRbcDegree.id, item);
      return await this.rbcDegreeRepository.findOne({
        where: {
          categoryId: item.categoryId,
          classId: item.classId,
          classNm: item.classNm,
        },
      });
    }
    return null;
  }

  async find(): Promise<RbcDegreeDto[]> {
    return await this.rbcDegreeRepository.find();
  }

  async remove(): Promise<void> {
    const degree = await this.rbcDegreeRepository.find();

    // Remove the degree from the database
    await this.rbcDegreeRepository.remove(degree);
  }
}
