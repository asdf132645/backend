// src/file/file.service.ts
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';

@Injectable()
export class FileService {
  private readonly possibleExtensions = ['.txt', '.json', '.csv', '.hl7']; // 시도할 확장자 목록

  async readFile(filePath: string): Promise<any> {
    for (const extension of this.possibleExtensions) {
      try {
        const data = await fs.readFile(`${filePath}${extension}`, 'utf8');
        return { success: true, data };
      } catch (error) {
        // 파일을 찾을 수 없을 때의 에러는 무시하고 다음 확장자를 시도
        if (error.code !== 'ENOENT') {
          return {
            success: false,
            message: `Error reading file: ${error.message}`,
          };
        }
      }
    }
    return {
      success: false,
      message: `File not found with any of the extensions: ${this.possibleExtensions.join(', ')}`,
    };
  }
}
