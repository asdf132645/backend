import { Controller, Post, Body } from '@nestjs/common';
import { OracleProxyService } from './oracle.proxy.service';

@Controller('oracle')
export class SybaseController {
  constructor(private readonly oracleProxyService: OracleProxyService) {}

  // CBC 결과 조회 엔드포인트
  @Post('send')
  async sendRTS(@Body() body: any): Promise<any> {
    return await this.oracleProxyService.sendRTS(body);
  }
}
