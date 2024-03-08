// src/jsonReader/jsonReader.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class JsonReaderService {
  async readJsonFile(fullPath: string): Promise<any> {
    try {
      console.log(fullPath);
      const fileContent = await fs.readJson(fullPath);
      return fileContent;
    } catch (error) {
      throw new Error(`Error reading JSON file: ${error.message}`);
    }
  }
}
