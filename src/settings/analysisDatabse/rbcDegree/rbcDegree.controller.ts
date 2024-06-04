// src/rbcDegree/rbcDegree.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { RbcDegreeService } from './rbcDegree.service';
import { CategoryDto, RbcDegreeDto } from './dto/rbcDegree.dto';

@Controller('rbcDegree')
export class RbcDegreeController {
  constructor(private readonly rbcDegreeService: RbcDegreeService) {}

  @Post('rbcDegreeAdd')
  async create(@Body() rbcDegreeDto: RbcDegreeDto): Promise<void> {
    try {
      await this.rbcDegreeService.create(rbcDegreeDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Put()
  async update(@Body() updateRbcDegreeDto: CategoryDto[]): Promise<RbcDegreeDto> {
    return this.rbcDegreeService.update(updateRbcDegreeDto);
  }

  @Get()
  async findOne(): Promise<RbcDegreeDto> {
    return this.rbcDegreeService.find();
  }

  @Get()
  async findAll(): Promise<RbcDegreeDto[]> {
    return this.rbcDegreeService.findAll();
  }

  @Delete()
  async remove(): Promise<void> {
    return this.rbcDegreeService.remove();
  }
}
