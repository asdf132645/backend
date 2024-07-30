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
import * as moment from 'moment';

@Controller('runningInfo')
export class RuningInfoController {
  constructor(private readonly runingInfoService: RuningInfoService) {}

  @Get('pageUpDown')
  async getPageUpDown(
    @Query('id') id: string,
    @Query('step') step: number,
    @Query('type') type: string,
  ): Promise<RuningInfoEntity | null> {
    return this.runingInfoService.getUpDownRunnInfo(
      Number(id),
      Number(step),
      type,
    );
  }

  @Get('clearPcIpState')
  async clearPcIpAndState(@Query('oldPcIp') oldPcIp: string): Promise<void> {
    await this.runingInfoService.clearPcIpAndState(oldPcIp);
  }

  @Get('updatePcIpState')
  async updatePcIpAndState(
    @Query('oldPcIp') oldPcIp: string,
    @Query('newEntityId') newEntityId: number,
    @Query('newPcIp') newPcIp: string,
  ): Promise<void> {
    await this.runingInfoService.updatePcIpAndState(
      oldPcIp,
      newEntityId,
      newPcIp,
    );
  }

  @Post('create')
  async create(
    @Body() createDto: CreateRuningInfoDto,
  ): Promise<RuningInfoEntity> {
    return this.runingInfoService.create(createDto);
  }

  @Delete('delete')
  async deleteMultiple(@Body() req: any): Promise<{ success: boolean }> {
    console.log(req.ids);
    const result = await this.runingInfoService.delete(req.ids, req.rootPath);
    return { success: result };
  }

  @Put('update')
  async update(
    @Body() updateDto: UpdateRuningInfoDto,
  ): Promise<RuningInfoEntity[]> {
    return this.runingInfoService.update(updateDto);
  }

  @Get('detail/:id')
  async getRunningInfoById(
    @Param('id') id: string,
  ): Promise<RuningInfoEntity | null> {
    return this.runingInfoService.getRunningInfoById(Number(id));
  }

  @Get('classDetailSelectQuery/:id')
  async getRunningInfoByIdDetail(
    @Param('id') id: string,
  ): Promise<RuningInfoEntity | null> {
    return this.runingInfoService.getRunningInfoById(Number(id));
  }

  @Get('getAll')
  async findAllWithPagingAndFilter(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('startDay') startDay?: string,
    @Query('endDay') endDay?: string,
    @Query('barcodeNo') barcodeNo?: string,
    @Query('patientId') patientId?: string,
    @Query('patientNm') patientNm?: string,
    @Query('nrCount') nrCount?: string,
    @Query('title') titles?: string,
    @Query('testType') testType?: string,
    @Query('wbcCountOrder') wbcCountOrder?: string,
  ): Promise<{ data: RuningInfoEntity[]; total: number; page: number }> {
    // 입력된 날짜 문자열을 Date 객체로 변환
    const startDate = startDay ? moment(startDay).toDate() : undefined;
    const endDate = endDay ? moment(endDay).toDate() : undefined;

    // titles 문자열을 쉼표로 분리하여 배열로 변환
    let titlesArray: string[] | undefined;
    if (titles) {
      titlesArray = titles.split(',');
    }

    // RuningInfoService를 호출하여 결과를 가져옵니다.
    const result = await this.runingInfoService.findAllWithPagingAndFilter(
      page,
      pageSize,
      startDate,
      endDate,
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
