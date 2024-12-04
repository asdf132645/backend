// file-system.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  getLogs(folderPath: string): any {
    try {
      const currentDate = new Date();
      const startDate = new Date();
      startDate.setDate(currentDate.getDate() - 5);

      const logs: Set<string> = new Set();
      const logDetails: { timestamp: string; message: string }[] = [];

      // 폴더 확인
      if (!fs.existsSync(folderPath)) {
        return new HttpException(
          {
            message: '지정된 폴더가 존재하지 않습니다.',
            error: 'Invalid Folder Path',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      // 폴더의 모든 파일 확인
      const files = fs.readdirSync(folderPath);
      files.forEach((file) => {
        // 파일 이름이 "YYYY_MM_DD_Error_Log.txt" 형식인지 확인
        const match = file.match(/^(\d{4})_(\d{2})_(\d{2})_Error_Log\.txt$/);
        if (match) {
          const fileDate = new Date(`${match[1]}-${match[2]}-${match[3]}`);
          if (fileDate >= startDate && fileDate <= currentDate) {
            // 파일 내용 읽기
            const filePath = path.join(folderPath, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const lines = content.split('\n');

            lines.forEach((line) => {
              const timestampMatch = line.match(
                /^\[(\d{2}:\d{2}:\d{2}\.\d{3})\]/,
              );
              const messageMatch = line.match(/\] \d+, .+\[(.+)\]/);

              if (timestampMatch && messageMatch) {
                const fullMessage = messageMatch[0];
                if (!logs.has(fullMessage)) {
                  logs.add(fullMessage);
                  logDetails.push({
                    timestamp: timestampMatch[1],
                    message: fullMessage.trim(),
                  });
                }
              }
            });
          }
        }
      });

      return logDetails;
    } catch (error) {
      if (error instanceof HttpException) {
        return error; // 이미 정의된 HttpException은 그대로 전달
      }
      return new HttpException(
        {
          message: '로그를 처리하는 중에 알 수 없는 오류가 발생했습니다.',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
