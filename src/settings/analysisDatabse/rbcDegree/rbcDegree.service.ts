import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDto, RbcDegreeDto } from './dto/rbcDegree.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RbcDegree } from './rbcDegree.entity';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RbcDegreeService {
  constructor(
    @InjectRepository(RbcDegree)
    private readonly rbcDegreeRepository: Repository<RbcDegree>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(rbcDegreeDto: RbcDegreeDto): Promise<void> {
    // RbcDegree 엔터티 생성 및 저장
    const rbcDegree = this.rbcDegreeRepository.create(rbcDegreeDto);
    await this.rbcDegreeRepository.save(rbcDegree);

    // 카테고리 엔터티 생성 및 저장
    const categories = rbcDegreeDto.categories.map((categoryDto) => {
      const category = this.categoryRepository.create({
        ...categoryDto,
        rbcDegree: rbcDegree,
      });
      return category;
    });

    await this.categoryRepository.save(categories);
  }

  async update(updateRbcDegreeDto: CategoryDto[]): Promise<RbcDegreeDto> {
    const existingDegree = await this.rbcDegreeRepository.find({ relations: ['categories'] });

    updateRbcDegreeDto.forEach((updatedCategory: any) => {
      const existingCategory = existingDegree[0].categories.find(
        (category: any) =>
          category.category_id === updatedCategory.category_id &&
          category.class_id === updatedCategory.class_id &&
          category.class_nm === updatedCategory.class_nm,
      );

      if (existingCategory) {
        existingCategory.degree1 = updatedCategory.degree1;
        existingCategory.degree2 = updatedCategory.degree2;
        existingCategory.degree3 = updatedCategory.degree3;
      }
    });

    await this.rbcDegreeRepository.save(existingDegree);
    await this.categoryRepository.save(existingDegree[0].categories);
    return existingDegree[0];
  }

  async find(): Promise<RbcDegreeDto> {
    // Find the RbcDegree entity by userId
    const degree = await this.rbcDegreeRepository.find({
      relations: ['categories'], // Load categories relation
    });

    if (!degree) {
      return degree[0];
    }

    return degree[0];
  }

  async findAll(): Promise<RbcDegreeDto[]> {
    // Find all RbcDegree entities
    return this.rbcDegreeRepository.find({ relations: ['categories'] }); // Load categories relation
  }

  async remove(): Promise<void> {
    // Find the RbcDegree entity by userId
    const degree = await this.rbcDegreeRepository.find({
      relations: ['categories'], // Load categories relation
    });

    // Remove the degree from the database
    await this.rbcDegreeRepository.remove(degree);
  }
}
