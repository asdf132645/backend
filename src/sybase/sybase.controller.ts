// sybase.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SybaseProxyService } from './sybase.proxy.service';

@Controller('sybase')
export class SybaseController {
  constructor(private readonly sybaseProxyService: SybaseProxyService) {}

  // CBC 결과 조회 엔드포인트
  @Get('cbc-results')
  async getCbcResults(@Query('smp_no') smp_no: string): Promise<any> {
    return await this.sybaseProxyService.getCbcResults(smp_no);
  }

  // UIMD 결과 저장 엔드포인트
  @Post('save-uimd-result')
  async saveUimdResult(@Body() data: any): Promise<any> {
    return await this.sybaseProxyService.saveUimdResult(data);
  }

  @Post('cbcImgGet')
  async cbcImgGet(@Body() data: any): Promise<any> {
    return await this.sybaseProxyService.cbcImgGet(data);
  }
}
