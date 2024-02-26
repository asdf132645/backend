import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { WbcCountSetService } from './wbcRunCount.service';
import { WbcRunCountEntity } from './wbcRunCount.entity';
import { CreateWbcRunCountDto } from './dto/wbcRunCountDto';

@Controller('runCount')
export class WbcRunCountController {
  constructor(private readonly wbcCountSetService: WbcCountSetService) {}

  @Post('create')
  async create(
    @Param('userId') userId: number,
    @Body() createDto: CreateWbcRunCountDto,
  ): Promise<WbcRunCountEntity> {
    return this.wbcCountSetService.create(createDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateWbcRunCountDto,
  ): Promise<WbcRunCountEntity[]> {
    return this.wbcCountSetService.update(Number(id), updateDto);
  }

  @Get('get/:userId')
  async findByUserId(
    @Param('userId') userId: number,
  ): Promise<WbcRunCountEntity[]> {
    return this.wbcCountSetService.findByUserId(userId);
  }
}
