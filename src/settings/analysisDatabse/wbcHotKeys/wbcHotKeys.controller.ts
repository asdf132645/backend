// src/wbc-hot-keys/wbc-hot-keys.controller.ts
import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { WbcHotKeysService } from './wbcHotKeys.service';
import { WbcHotKeys } from './wbcHotKeys.entity';
import { CreateWbcHotKeysDto } from './dto/wbcHotKeys.dto';

@Controller('wbcHotKeys')
export class WbcHotKeysController {
  constructor(private readonly wbcHotKeysService: WbcHotKeysService) {}

  @Post('create')
  async create(
    @Param('userId') userId: number,
    @Body() createDto: CreateWbcHotKeysDto,
  ): Promise<WbcHotKeys> {
    return this.wbcHotKeysService.create(createDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateWbcHotKeysDto,
  ): Promise<WbcHotKeys[]> {
    return this.wbcHotKeysService.update(Number(id), updateDto);
  }

  @Get('get/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<WbcHotKeys[]> {
    return this.wbcHotKeysService.findByUserId(userId);
  }
}
