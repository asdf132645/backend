// file-system.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class FileSystemService {
  async createFolder(path: string): Promise<void> {
    try {
      await fs.ensureDir(path);
    } catch (error) {
      throw new Error(`Failed to create folder at path: ${path}`);
    }
  }

  async deleteFolder(path: string): Promise<void> {
    try {
      await fs.remove(path);
    } catch (error) {
      throw new Error(`Failed to delete folder at path: ${path}`);
    }
  }
}
