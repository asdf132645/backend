// src/file/file.service.ts
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { writeFile, mkdir, access, constants } from 'fs/promises';
import * as path from 'path';
import * as fss from 'fs'; // 'fs/promises' 대신 'fs'를 사용

@Injectable()
export class FileService {
  private readonly possibleExtensions = [
    '.txt',
    '.json',
    '.csv',
    '.hl7',
    '.ini',
  ]; // 시도할 확장자 목록

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
  checkFileExists(directoryPath: string, filename: string): boolean {
    const fullPath = path.join(directoryPath, filename);
    return fss.existsSync(fullPath);
  }
  async cbcSaveDataService(filePath: string, data: any): Promise<void> {
    // 클라이언트가 제공한 파일 경로를 직접 사용
    const directory = path.dirname(filePath);

    // 디렉토리 존재 확인 및 생성
    await this.ensureDirectoryExistence(directory);

    try {
      // 파일이 아닌 디렉토리인지 확인
      await access(filePath, constants.F_OK);
      console.log(`File or directory exists at ${filePath}`);
    } catch {
      // 파일이 없으면 새로 생성
      await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
  }

  private async ensureDirectoryExistence(directory: string): Promise<any> {
    try {
      await mkdir(directory, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
      throw error;
    }
  }
}
