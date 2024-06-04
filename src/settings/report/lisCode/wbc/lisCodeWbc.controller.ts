import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { LisCodeWbcService } from './lisCodeWbc.service';
import { LisCodeWbcEntity } from './lisCodeWbc.entity';
import { CreateLisCodeDto } from './dto/lisCodeWbcDto';

@Controller('lisCode')
export class LisCodeWbcController {
  constructor(private readonly lisCode: LisCodeWbcService) {}

  @Post('create')
  async create(@Body() createDto: CreateLisCodeDto): Promise<LisCodeWbcEntity> {
    return this.lisCode.create(createDto);
  }

  @Put('update')
  async update(@Body() updateDto: CreateLisCodeDto): Promise<LisCodeWbcEntity[]> {
    return this.lisCode.update(updateDto);
  }

  @Get('get')
  async get(): Promise<LisCodeWbcEntity[]> {
    return this.lisCode.find();
  }
}
