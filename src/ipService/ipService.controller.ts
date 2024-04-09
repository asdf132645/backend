import { Controller, Get, Req } from '@nestjs/common';
import { IpService } from './ipService.service';

@Controller('ip')
export class IpController {
  constructor(private readonly ipService: IpService) {}

  @Get()
  getClientIp(@Req() req): string {
    return this.ipService.getClientIp(req);
  }
}
