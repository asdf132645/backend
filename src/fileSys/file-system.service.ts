// file-system.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { exec } from 'child_process';
import * as path from 'path';
import * as moment from 'moment';
import { readdir } from 'fs-extra';

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

  async copyFile(source: string, destination: string): Promise<void> {
    exec(`copy "${source}" "${destination}" /Y`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error copying file:', error);
        return;
      }
      console.log('File copied successfully:', stdout);
    });
  }

  async cleanupOldFiles(directoryPath: string, keyword: string): Promise<void> {
    try {
      const files = await fs.promises.readdir(directoryPath);
      const oneMonthAgo = moment().subtract(1, 'months'); // 한 달 전 날짜 계산

      for (const file of files) {
        // 특정 문자열이 파일 이름에 포함되어 있는지 확인
        if (file.includes(keyword)) {
          // 파일 이름에서 날짜를 추출
          const match = file.match(/_(\d{14})\.hl7$/);
          if (match) {
            const dateString = match[1];
            const fileDate = moment(dateString, 'YYYYMMDDHHmmss'); // moment를 사용해 날짜 생성

            // 한 달이 지났는지 확인
            if (fileDate.isBefore(oneMonthAgo)) {
              const filePath = path.join(directoryPath, file);

              // exec을 사용하여 파일 강제 삭제
              exec(`del /F /Q "${filePath}"`, (error, stdout, stderr) => {
                if (error) {
                  console.error(`Error deleting file ${filePath}:`, error);
                } else {
                  console.log(`Deleted file: ${filePath}`);
                }
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error reading directory or deleting files:', error);
    }
  }

  async checkFileExistence(
    directoryPath: string,
    keyword: string,
  ): Promise<boolean> {
    try {
      const files = await fs.promises.readdir(directoryPath);
      // 특정 문자열을 포함하는 파일이 있는지 확인
      const fileExists = files.some((file) => file.includes(keyword));
      return fileExists;
    } catch (error) {
      console.error('Error reading directory:', error);
      return false;
    }
  }

  async findFilesByString(
    directoryPath: string,
    searchString: string,
  ): Promise<string[]> {
    try {
      const files = await readdir(directoryPath);
      return files.filter((file) => file.includes(searchString));
    } catch (error) {
      throw new Error(`Failed to read directory: ${error.message}`);
    }
  }
}
