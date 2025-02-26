import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { AutoCbcService } from './autoCbc.service';
import { AutoCbc } from './autoCbc.entity';
import { autoCbcItems } from './dto/autoCbcDto';

@Controller('autoCbc')
export class AutoCbcController {
  constructor(private readonly autoCbcService: AutoCbcService) {}

  @Get('findAutoCbc')
  findAll(): Promise<AutoCbc[]> {
    return this.autoCbcService.findAll();
  }

  @Post('autoCbcCreate')
  create(@Body() autoCbcData: autoCbcItems): Promise<AutoCbc> {
    return this.autoCbcService.create(autoCbcData);
  }

  @Put('autoCbcPut')
  update(@Body() autoCbcData: autoCbcItems): Promise<AutoCbc> {
    return this.autoCbcService.update(autoCbcData.id, autoCbcData);
  }

  @Delete('autoCbcDel')
  delete(@Body('id') id: number): Promise<void> {
    return this.autoCbcService.delete(id);
  }

  @Post('autoCbcUpdateAll')
  async updateAll(
    @Body() autoCbcDataArray: autoCbcItems[],
  ): Promise<AutoCbc[]> {
    // 서비스 호출하여 전체 배열 업데이트 후 최신 데이터 반환
    return this.autoCbcService.updateAll(autoCbcDataArray);
  }
}
