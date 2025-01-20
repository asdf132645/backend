import { Module } from '@nestjs/common';
import { RTFController } from './rtf.controller';
import { RTFService } from './rtf.service';

@Module({
  controllers: [RTFController],
  providers: [RTFService],
})
export class RTFModule {}
