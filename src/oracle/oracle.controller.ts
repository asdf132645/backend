import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { OracleProxyService } from './oracle.proxy.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('oracle')
export class OracleController {
  constructor(private readonly oracleProxyService: OracleProxyService) {}

  // CBC 결과 조회 엔드포인트
  @Post('rtf-send')
  @UseInterceptors(FileInterceptor('rtfContent'))
  async sendRTS(@Body() body: any): Promise<any> {
    return await this.oracleProxyService.sendRTS(body);
  }
}
