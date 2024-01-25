// combined.module.ts

import { Module } from '@nestjs/common';
import { CombinedService } from './combined.service';
import { Logger } from '@nestjs/common'; // Logger 추가

@Module({
  providers: [CombinedService,Logger],
  exports: [CombinedService,Logger],
})
export class CombinedModule {}
