// src/wbcCustomClass/wbcCustomClass.controller.ts

import { Controller, Get, Post, Body, Put } from '@nestjs/common';
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

  @Put('update')
  update(@Body() updateDto: UpdateWbcCustomClassDto) {
    return this.wbcCustomClassService.update(updateDto);
  }

  @Get('get')
  get() {
    return this.wbcCustomClassService.find();
  }
}
