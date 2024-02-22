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
  @Put(':userId')
  async update(
    @Param('userId') userId: number,
    @Body() updateRbcDegreeDto: CategoryDto[],
  ): Promise<RbcDegreeDto> {
    return this.rbcDegreeService.update(updateRbcDegreeDto, userId);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: number): Promise<RbcDegreeDto> {
    return this.rbcDegreeService.findOne(Number(userId));
  }

  @Get()
  async findAll(): Promise<RbcDegreeDto[]> {
    return this.rbcDegreeService.findAll();
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: number): Promise<void> {
    return this.rbcDegreeService.remove(Number(userId));
  }
}
