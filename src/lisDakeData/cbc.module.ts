import { Module } from '@nestjs/common';
import { CbcController } from './cbc.controller';
import { CbcService } from './cbc.service';

@Module({
  controllers: [CbcController],
  providers: [CbcService],
})
export class CbcModule {}
