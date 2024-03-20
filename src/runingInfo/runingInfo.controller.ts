// runing-info.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  Delete,
  Param,
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
  @Delete('delete')
  async deleteMultiple(@Body() ids: string[]): Promise<{ success: boolean }> {
    console.log(ids);
    const result = await this.runingInfoService.delete(ids);
    return { success: result };
  }

  @Put('update')
  async update(
    @Body() updateDto: UpdateRuningInfoDto,
  ): Promise<RuningInfoEntity[]> {
    return this.runingInfoService.update(updateDto);
  }

  @Get('getAll')
  async findAllWithPagingAndFilter(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('startDay') startDay?: Date,
    @Query('endDay') endDay?: Date,
    @Query('barcodeNo') barcodeNo?: string,
    @Query('patientId') patientId?: string,
    @Query('patientNm') patientNm?: string,
    @Query('nrCount') nrCount?: string,
    @Query('title') titles?: string,
    @Query('testType') testType?: string,
    @Query('wbcCountOrder') wbcCountOrder?: string,
  ): Promise<{ data: RuningInfoEntity[]; total: number; page: number }> {
    let titlesArray: string[] | undefined;
    if (titles) {
      titlesArray = titles.split(',');
    }
    const result = await this.runingInfoService.findAllWithPagingAndFilter(
      page,
      pageSize,
      startDay,
      endDay,
      barcodeNo,
      patientId,
      patientNm,
      nrCount,
      titlesArray,
      testType,
      wbcCountOrder,
    );

    return { data: result.data, total: result.total, page };
  }
}
