import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDto, RbcDegreeDto } from './dto/rbcDegree.dto';
import { User } from '../../../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RbcDegree } from './rbcDegree.entity';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RbcDegreeService {
  constructor(
    @InjectRepository(RbcDegree)
    private readonly rbcDegreeRepository: Repository<RbcDegree>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async update(
    updateRbcDegreeDto: CategoryDto[],
    userId: number,
  ): Promise<RbcDegreeDto> {
    console.log('update');
    await this.findUserById(userId);

    const existingDegree = await this.rbcDegreeRepository.findOne({
      where: { userId },
      relations: ['categories'],
    });
    // console.log('uuuuu');

    if (!existingDegree) {
      throw new NotFoundException(
        `userId가 ${userId}인 정보를 찾을 수 없습니다`,
      );
    }

    updateRbcDegreeDto.forEach((updatedCategory: any) => {
      const existingCategory = existingDegree.categories.find(
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
    await this.categoryRepository.save(existingDegree.categories);
    return existingDegree;
  }

  async findOne(userId: number): Promise<RbcDegreeDto> {
    // Find the RbcDegree entity by userId
    const degree = await this.rbcDegreeRepository.findOne({
      where: { userId },
      relations: ['categories'], // Load categories relation
    });

    if (!degree) {
      return degree;
    }

    return degree;
  }

  async findAll(): Promise<RbcDegreeDto[]> {
    // Find all RbcDegree entities
    return this.rbcDegreeRepository.find({ relations: ['categories'] }); // Load categories relation
  }

  async remove(userId: number): Promise<void> {
    // Find the RbcDegree entity by userId
    const degree = await this.rbcDegreeRepository.findOne({
      where: { userId },
      relations: ['categories'], // Load categories relation
    });

    if (!degree) {
      throw new NotFoundException(
        `userId가 ${userId}인 정보를 찾을 수 없습니다`,
      );
    }

    // Remove the degree from the database
    await this.rbcDegreeRepository.remove(degree);
  }

  private async findUserById(userId: number): Promise<void> {
    try {
      // Check if user exists
      const user = await this.userRepository.findOne({ where: { id: userId } });
      console.log('findUserById');
      if (!user) {
        throw new NotFoundException(
          `userId가 ${userId}인 사용자를 찾을 수 없습니다`,
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
