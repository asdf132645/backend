// src/jsonReader/jsonReader.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { JsonReaderService } from './jsonReader.service';

@Controller('jsonReader')
export class JsonReaderController {
  constructor(private readonly jsonReaderService: JsonReaderService) {}

  @Post('send')
  async getJsonFile(@Body('fullPath') fullPath: string): Promise<any> {
    console.log(fullPath);
    return this.jsonReaderService.readJsonFile(fullPath);
  }
}
