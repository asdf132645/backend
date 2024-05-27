// combined.module.ts

import { Module } from '@nestjs/common';
import { DziController } from './dziReader.controller';

@Module({
  controllers: [DziController],
})
export class DziReaderModule {}
