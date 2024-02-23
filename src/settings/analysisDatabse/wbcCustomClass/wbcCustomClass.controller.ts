// src/wbcCustomClass/wbcCustomClass.controller.ts

import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { WbcCustomClassService } from './wbcCustomClass.service';
import {
  CreateWbcCustomClassDto,
  UpdateWbcCustomClassDto,
} from './dto/wbcCustomDto';

@Controller('wbcCustomClass')
export class WbcCustomClassController {
  constructor(private readonly wbcCustomClassService: WbcCustomClassService) {}

  @Post('create')
  create(@Body() createDto: CreateWbcCustomClassDto) {
    return this.wbcCustomClassService.create(createDto);
  }

  @Put('update/:userId')
  update(
    @Param('userId') id: number,
    @Body() updateDto: UpdateWbcCustomClassDto,
  ) {
    // console.log(updateDto);
    return this.wbcCustomClassService.update(updateDto.userId, updateDto);
  }

  @Get('get/:userId')
  findByUserId(@Param('userId') userId: number) {
    return this.wbcCustomClassService.findByUserId(userId);
  }
}
