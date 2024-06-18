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
    const { classArr } = createDto;

    const createdClasses: WbcCustomClass[] = [];

    for (const classItem of classArr) {
      const wbcCustomClass = this.wbcCustomClassRepository.create({
        abbreviation: classItem.abbreviation,
        fullNm: classItem.fullNm,
        customNum: classItem.customNum,
      });
      const createdClass =
        await this.wbcCustomClassRepository.save(wbcCustomClass);
      createdClasses.push(createdClass);
    }

    return createdClasses;
  }

  async update(updateDto: UpdateWbcCustomClassDto): Promise<WbcCustomClass[]> {
    const { classArr } = updateDto;
    const updatedClasses: WbcCustomClass[] = [];

    for (const classItem of classArr) {
      const wbcCustomClass = this.wbcCustomClassRepository.create({
        abbreviation: classItem.abbreviation,
        fullNm: classItem.fullNm,
        customNum: classItem.customNum,
      });

      // customNum가 일치하는 엔터티를 찾기 위해 where 옵션을 추가
      await this.wbcCustomClassRepository.update(
        { id: classItem?.id },
        wbcCustomClass,
      );

      const updatedClass = await this.wbcCustomClassRepository.findOne({
        where: { customNum: classItem?.id },
      });

      updatedClasses.push(updatedClass);
    }

    return updatedClasses;
  }

  async findAll(): Promise<WbcCustomClass[]> {
    return this.wbcCustomClassRepository.find();
  }

  async find(): Promise<WbcCustomClass[]> {
    return this.wbcCustomClassRepository.find();
  }
}
