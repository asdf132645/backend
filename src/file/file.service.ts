// src/file/file.service.ts
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';

@Injectable()
export class FileService {
  async readFile(filePath: string): Promise<any> {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        message: `Error reading file: ${error.message}`,
      };
    }
  }

}
