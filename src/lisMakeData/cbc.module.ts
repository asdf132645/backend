import { Module } from '@nestjs/common';
import { CbcController } from './cbc.controller';
import { CbcService } from './cbc.service';
import { LoggerService } from '../logger.service';

@Module({
  controllers: [CbcController],
  providers: [CbcService, LoggerService],
})
export class CbcModule {}
