import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { MinCountService } from './minCount.service';
import { MinCountEntity } from './minCount.entity';
import { CreateMinCountDto } from './dto/minCountDto';

@Controller('minCount')
export class MinCountController {
  constructor(private readonly minCountService: MinCountService) {}

  @Post('minCountCreate')
  async create(@Body() createDto: CreateMinCountDto): Promise<MinCountEntity> {
    return this.minCountService.create(createDto);
  }

  @Put('minCountUpdate')
  async update(
    @Body() updateDto: CreateMinCountDto,
  ): Promise<MinCountEntity[]> {
    return this.minCountService.update(updateDto);
  }

  @Get('minCountGet')
  async get(): Promise<MinCountEntity[]> {
    return this.minCountService.find();
  }
}
