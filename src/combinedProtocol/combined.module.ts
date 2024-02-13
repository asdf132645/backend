// combined.module.ts

import { Module } from '@nestjs/common';
import { CombinedService } from './combined.service';
import { LoggerService } from '../logger.service';

@Module({
  providers: [CombinedService, LoggerService],
  exports: [CombinedService, LoggerService],
})
export class CombinedModule {}
