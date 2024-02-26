// src/wbcCustomClass/wbcCustomClass.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WbcCustomClass } from './wbcCustomClass.entity';
import {
  CreateWbcCustomClassDto,
  UpdateWbcCustomClassDto,
} from './dto/wbcCustomDto';

@Injectable()
export class WbcCustomClassService {
  constructor(
    @InjectRepository(WbcCustomClass)
    private readonly wbcCustomClassRepository: Repository<WbcCustomClass>,
  ) {}

  async create(createDto: CreateWbcCustomClassDto): Promise<WbcCustomClass[]> {
    const { classArr, userId } = createDto;

    const createdClasses: WbcCustomClass[] = [];

    for (const classItem of classArr) {
      const wbcCustomClass = this.wbcCustomClassRepository.create({
        abbreviation: classItem.abbreviation,
        className: classItem.className,
        customNum: classItem.customNum,
        userId,
      });
      const createdClass =
        await this.wbcCustomClassRepository.save(wbcCustomClass);
      createdClasses.push(createdClass);
    }

    return createdClasses;
  }

  async update(
    userId: number,
    updateDto: UpdateWbcCustomClassDto,
  ): Promise<WbcCustomClass[]> {
    const { classArr } = updateDto;

    const updatedClasses: WbcCustomClass[] = [];

    for (const classItem of classArr) {
      const wbcCustomClass = this.wbcCustomClassRepository.create({
        abbreviation: classItem.abbreviation,
        className: classItem.className,
        customNum: classItem.customNum,
      });

      // userId와 customNum이 모두 일치하는 엔터티를 찾기 위해 where 옵션을 추가
      await this.wbcCustomClassRepository.update(
        { userId, id: classItem.customNum },
        wbcCustomClass,
      );

      const updatedClass = await this.wbcCustomClassRepository.findOne({
        where: { userId, customNum: classItem.customNum },
      });

      updatedClasses.push(updatedClass);
    }

    return updatedClasses;
  }

  async findAll(): Promise<WbcCustomClass[]> {
    return this.wbcCustomClassRepository.find();
  }

  async findByUserId(userId: number): Promise<WbcCustomClass[]> {
    return this.wbcCustomClassRepository.find({ where: { userId } });
  }
}
