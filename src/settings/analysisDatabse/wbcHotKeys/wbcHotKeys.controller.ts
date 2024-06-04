// src/wbc-hot-keys/wbc-hot-keys.controller.ts
import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { WbcHotKeysService } from './wbcHotKeys.service';
import { WbcHotKeys } from './wbcHotKeys.entity';
import { CreateWbcHotKeysDto } from './dto/wbcHotKeys.dto';

@Controller('wbcHotKeys')
export class WbcHotKeysController {
  constructor(private readonly wbcHotKeysService: WbcHotKeysService) {}

  @Post('create')
  async create(@Body() createDto: CreateWbcHotKeysDto): Promise<WbcHotKeys> {
    return this.wbcHotKeysService.create(createDto);
  }

  @Put('update')
  async update(@Body() updateDto: CreateWbcHotKeysDto): Promise<WbcHotKeys[]> {
    return this.wbcHotKeysService.update(updateDto);
  }

  @Get('get')
  async find(): Promise<WbcHotKeys[]> {
    return this.wbcHotKeysService.find();
  }
}
