import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { BfHotKeysService } from './bfHotKeys.service';
import { BfHotKeys } from './bfHotKeys.entity';
import { CreateBfHotKeysDto } from './dto/bfHotKeysDto';

@Controller('bfHotKeys')
export class BfHotKeysController {
  constructor(private readonly bfHotKeysService: BfHotKeysService) {}

  @Post('create')
  async create(@Body() createDto: CreateBfHotKeysDto): Promise<BfHotKeys> {
    return this.bfHotKeysService.create(createDto);
  }

  @Put('update')
  async update(@Body() updateDto: CreateBfHotKeysDto): Promise<BfHotKeys[]> {
    return this.bfHotKeysService.update(updateDto);
  }

  @Get('get')
  async findByUserId(): Promise<BfHotKeys[]> {
    return this.bfHotKeysService.find();
  }
}
