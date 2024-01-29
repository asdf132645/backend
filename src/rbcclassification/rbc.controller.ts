// rbc.controller.ts
import { Controller, Get } from '@nestjs/common';
import { RBCService } from './rbc.service';
import { RBCClassification } from './entities/rbc-classification.entity';

@Controller('rbc')
export class RBCController {
  constructor(private readonly rbcService: RBCService) {}

  @Get('/getAllRbc')
  findAll(): Promise<RBCClassification[]> {
    return this.rbcService.findAll();
  }
}
