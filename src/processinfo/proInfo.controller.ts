// proInfo.controller.ts

import { Controller, Get } from '@nestjs/common';
import { ProInfoService } from './proInfo.service';

@Controller('proinfo')
export class ProInfoController {
  constructor(private readonly proInfoService: ProInfoService) {}

  @Get('/getAllProcessInfo')
  async getAllProcessInfo() {
    return await this.proInfoService.getAllProcessInfo();
  }

}
