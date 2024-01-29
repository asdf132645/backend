// wbc.controller.ts
import { Controller, Get } from '@nestjs/common';
import { WBCService } from './wbc.service';
import { WBCClassification } from './entities/wbc-classification.entity';

@Controller('wbc')
export class WBCController {
  constructor(private readonly wbcService: WBCService) {}

  @Get('/getAllWbc')
  findAll(): Promise<WBCClassification[]> {
    return this.wbcService.findAll();
  }
}
