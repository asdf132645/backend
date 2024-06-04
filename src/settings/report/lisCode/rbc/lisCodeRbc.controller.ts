import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { LisCodeRbcService } from './lisCodeRbc.service';
import { LisCodeRbcEntity } from './lisCodeRbc.entity';
import { CreateLisCodeRbcDto } from './dto/lisCodeRbcDto';

@Controller('lisCodeRbc')
export class LisCodeController {
  constructor(private readonly lisCode: LisCodeRbcService) {}

  @Post('create')
  async create(@Body() createDto: CreateLisCodeRbcDto): Promise<LisCodeRbcEntity> {
    return this.lisCode.create(createDto);
  }

  @Put('update')
  async update(@Body() updateDto: CreateLisCodeRbcDto): Promise<LisCodeRbcEntity[]> {
    return this.lisCode.update(updateDto);
  }

  @Get('get')
  async get(): Promise<LisCodeRbcEntity[]> {
    return this.lisCode.find();
  }
}
