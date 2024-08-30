// combined.module.ts

import { Module } from '@nestjs/common';
import { CombinedService } from './combined.service';
import { LoggerService } from '../logger.service';
import { RuningInfoModule } from '../runingInfo/runingInfo.module';
import { BrowserService } from '../browserExit/browser.service';

@Module({
  imports: [RuningInfoModule],
  providers: [CombinedService, LoggerService, BrowserService],
  exports: [CombinedService, LoggerService, BrowserService],
})
export class CombinedModule {}
