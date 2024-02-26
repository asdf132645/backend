import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { CbcCodeService } from './cbcCode.service';
import { CbcCodeEntity } from './cbcCode.entity';
import { CreateCbcCodeDto } from './dto/cbcCodeDto';

@Controller('cbcCode')
export class CbcCodeController {
  constructor(private readonly cbcCodeService: CbcCodeService) {}

  @Post('create')
  async create(
    @Param('userId') userId: number,
    @Body() createDto: CreateCbcCodeDto,
  ): Promise<CbcCodeEntity> {
    return this.cbcCodeService.create(createDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateCbcCodeDto,
  ): Promise<CbcCodeEntity[]> {
    return this.cbcCodeService.update(Number(id), updateDto);
  }

  @Get('get/:userId')
  async findByUserId(
    @Param('userId') userId: number,
  ): Promise<CbcCodeEntity[]> {
    return this.cbcCodeService.findByUserId(userId);
  }
}
