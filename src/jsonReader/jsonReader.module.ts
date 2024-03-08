// combined.module.ts

import { Module } from '@nestjs/common';
import { JsonReaderService } from './jsonReader.service';
import { JsonReaderController } from './jsonReader.controller';

@Module({
  providers: [JsonReaderService],
  exports: [JsonReaderService],
  controllers: [JsonReaderController],
})
export class JsonReaderModule {}
