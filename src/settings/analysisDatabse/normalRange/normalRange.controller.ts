import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { NormalRangeService } from './normalRange.service';
import { NormalRange } from './normalRange.entity';
import { NormalRangeDto } from './dto/normalRangeDto';

@Controller('normalRange')
export class NormalRangeController {
  constructor(private readonly normalRangeService: NormalRangeService) {}

  @Post('create')
  async create(@Body() createDto: NormalRangeDto): Promise<NormalRange> {
    return this.normalRangeService.create(createDto);
  }

  @Put('update')
  async update(
    @Body() updateDto: NormalRangeDto,
  ): Promise<NormalRange[]> {
    return this.normalRangeService.update(updateDto);
  }

  @Get('get')
  async find(): Promise<NormalRange[]> {
    return this.normalRangeService.find();
  }
}
