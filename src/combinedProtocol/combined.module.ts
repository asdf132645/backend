// combined.module.ts

import { Module } from '@nestjs/common';
import { CombinedService } from './combined.service';
import { LoggerService } from '../logger.service';
import { RuningInfoModule } from '../runingInfo/runingInfo.module';

@Module({
  imports: [RuningInfoModule],
  providers: [CombinedService, LoggerService],
  exports: [CombinedService, LoggerService],
})
export class CombinedModule {}
