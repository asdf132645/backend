import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { CbcCodeService } from './cbcCode.service';
import { CbcCodeEntity } from './cbcCode.entity';
import { CreateCbcCodeDto } from './dto/cbcCodeDto';

@Controller('cbcCode')
export class CbcCodeController {
  constructor(private readonly cbcCodeService: CbcCodeService) {}

  @Post('create')
  async create(@Body() createDto: CreateCbcCodeDto): Promise<CbcCodeEntity> {
    return this.cbcCodeService.create(createDto);
  }

  @Put('update')
  async update(@Body() updateDto: CreateCbcCodeDto): Promise<CbcCodeEntity[]> {
    return this.cbcCodeService.update(updateDto);
  }

  @Get('get')
  async get(): Promise<CbcCodeEntity[]> {
    return this.cbcCodeService.find();
  }
}
