import { Module } from '@nestjs/common';
import { HL7Controller } from './hl7.controller';
import { HL7Service } from './hl7.service';

@Module({
  controllers: [HL7Controller],
  providers: [HL7Service],
})
export class Hl7Module {};
