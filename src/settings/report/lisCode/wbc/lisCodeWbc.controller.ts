import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { LisCodeWbcService } from './lisCodeWbc.service';
import { LisCodeWbcEntity } from './lisCodeWbc.entity';
import { CreateLisCodeDto } from './dto/lisCodeWbcDto';

@Controller('lisCode')
export class LisCodeWbcController {
  constructor(private readonly lisCode: LisCodeWbcService) {}

  @Post('lisCodeCreate')
  async create(@Body() createDto: CreateLisCodeDto): Promise<LisCodeWbcEntity> {
    return this.lisCode.create(createDto);
  }

  @Put('lisCodeUpdate')
  async update(
    @Body() updateDto: CreateLisCodeDto,
  ): Promise<LisCodeWbcEntity[]> {
    return this.lisCode.update(updateDto);
  }

  @Get('lisCodeGet')
  async get(): Promise<LisCodeWbcEntity[]> {
    return this.lisCode.find();
  }
}
