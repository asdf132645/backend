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

  @Post('wbcCustomClassCreate')
  create(@Body() createDto: CreateWbcCustomClassDto) {
    return this.wbcCustomClassService.create(createDto);
  }

  @Put('wbcCustomClassUpdate')
  update(@Body() updateDto: UpdateWbcCustomClassDto) {
    return this.wbcCustomClassService.update(updateDto);
  }

  @Get('wbcCustomClassGet')
  get() {
    return this.wbcCustomClassService.find();
  }
}
