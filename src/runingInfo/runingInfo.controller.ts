// runing-info.controller.ts

import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RuningInfoService } from './runingInfo.service';
import {
  CreateRuningInfoDto,
  UpdateRuningInfoDto,
} from './dto/runingInfoDtoItems';
import { RuningInfoEntity } from './runingInfo.entity';

@Controller('runningInfo')
export class RuningInfoController {
  constructor(private readonly runingInfoService: RuningInfoService) {}

  @Post('create')
  async create(
    @Body() createDto: CreateRuningInfoDto,
  ): Promise<RuningInfoEntity> {
    return this.runingInfoService.create(createDto);
  }

  @Post('update/:userId')
  async update(
    @Param('userId') userId: number,
    @Body() updateDto: UpdateRuningInfoDto,
  ): Promise<RuningInfoEntity[]> {
    return this.runingInfoService.update(userId, updateDto);
  }

  @Get('get/:userId')
  async findByUserId(
    @Param('userId') userId: number,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
  ): Promise<{ data: RuningInfoEntity[]; total: number }> {
    return this.runingInfoService.findByUserId(userId, page, pageSize);
  }
}
