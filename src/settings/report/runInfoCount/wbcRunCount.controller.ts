import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { WbcCountSetService } from './wbcRunCount.service';
import { WbcRunCountEntity } from './wbcRunCount.entity';
import { CreateWbcRunCountDto } from './dto/wbcRunCountDto';

@Controller('runCount')
export class WbcRunCountController {
  constructor(private readonly wbcCountSetService: WbcCountSetService) {}

  @Post('create')
  async create(@Body() createDto: CreateWbcRunCountDto): Promise<WbcRunCountEntity> {
    return this.wbcCountSetService.create(createDto);
  }

  @Put('update')
  async update(@Body() updateDto: CreateWbcRunCountDto): Promise<WbcRunCountEntity[]> {
    return this.wbcCountSetService.update(updateDto);
  }

  @Get('get')
  async find(): Promise<WbcRunCountEntity[]> {
    return this.wbcCountSetService.find();
  }
}
