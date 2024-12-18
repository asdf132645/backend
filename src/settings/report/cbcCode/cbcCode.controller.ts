import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { CbcCodeService } from './cbcCode.service';
import { CbcCodeEntity } from './cbcCode.entity';
import { CreateCbcCodeDto } from './dto/cbcCodeDto';

@Controller('cbcCode')
export class CbcCodeController {
  constructor(private readonly cbcCodeService: CbcCodeService) {}

  @Post('cbcCodeCreate')
  async create(@Body() createDto: CreateCbcCodeDto): Promise<CbcCodeEntity> {
    return this.cbcCodeService.create(createDto);
  }

  @Put('cbcCodeUpdate')
  async update(@Body() updateDto: CreateCbcCodeDto): Promise<CbcCodeEntity[]> {
    return this.cbcCodeService.update(updateDto);
  }

  @Get('cbcCodeGet')
  async get(): Promise<CbcCodeEntity[]> {
    return this.cbcCodeService.find();
  }
}
