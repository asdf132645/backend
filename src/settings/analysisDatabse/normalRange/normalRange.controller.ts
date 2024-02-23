import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { NormalRangeService } from './normalRange.service';
import { NormalRange } from './normalRange.entity';
import { NormalRangeDto } from './dto/normalRangeDto';

@Controller('normalRange')
export class NormalRangeController {
  constructor(private readonly normalRangeService: NormalRangeService) {}

  @Post('create')
  async create(
    @Param('userId') userId: number,
    @Body() createDto: NormalRangeDto,
  ): Promise<NormalRange> {
    return this.normalRangeService.create(createDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: NormalRangeDto,
  ): Promise<NormalRange[]> {
    return this.normalRangeService.update(Number(id), updateDto);
  }

  @Get('get/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<NormalRange[]> {
    return this.normalRangeService.findByUserId(userId);
  }
}
