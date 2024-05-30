import { Controller, Post, Body } from '@nestjs/common';
import { HL7Service } from './hl7.service';

@Controller('hl7')
export class HL7Controller {
  constructor(private readonly hl7Service: HL7Service) {}

  @Post('parse')
  async parseHL7Message(@Body() data: Buffer): Promise<any> {
    return this.hl7Service.parseHL7Message(data);
  }
}
