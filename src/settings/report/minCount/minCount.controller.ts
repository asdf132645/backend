import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { MinCountService } from './minCount.service';
import { MinCountEntity } from './minCount.entity';
import { CreateMinCountDto } from './dto/minCountDto';

@Controller('minCount')
export class MinCountController {
  constructor(private readonly minCountService: MinCountService) {}

  @Post('create')
  async create(
    @Param('userId') userId: number,
    @Body() createDto: CreateMinCountDto,
  ): Promise<MinCountEntity> {
    return this.minCountService.create(createDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateMinCountDto,
  ): Promise<MinCountEntity[]> {
    return this.minCountService.update(Number(id), updateDto);
  }

  @Get('get/:userId')
  async findByUserId(
    @Param('userId') userId: number,
  ): Promise<MinCountEntity[]> {
    return this.minCountService.findByUserId(userId);
  }
}
