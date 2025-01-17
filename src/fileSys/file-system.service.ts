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
      const currentDate = moment(); // 현재 날짜
      const yesterdayDate = moment().subtract(1, 'day').startOf('day'); // 어제 0시부터
      const todayStartDate = moment().startOf('day'); // 오늘 0시부터

      const groupedLogs: Record<
        string,
        {
          timestamp: string;
          E_CODE: string;
          E_NAME: string;
          E_TYPE: string;
          E_DESC: string;
          E_SOLN: string;
        }[]
      > = {};

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
        const match = file.match(/^(\d{4})_(\d{2})_(\d{2})_Error_Log\.txt$/);
        if (match) {
          const fileDate = moment(
            `${match[1]}-${match[2]}-${match[3]}`,
            'YYYY-MM-DD',
          );
          const dateKey = fileDate.format('YYYY-MM-DD');

          // 파일 날짜가 어제와 오늘 사이인지 확인
          if (
            fileDate.isBetween(yesterdayDate, currentDate, 'day', '[]') &&
            (fileDate.isSame(yesterdayDate, 'day') ||
              fileDate.isSame(todayStartDate, 'day'))
          ) {
            const filePath = path.join(folderPath, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const lines = content.split('\n');

            // 로그 순서를 역순으로 처리
            lines.reverse();

            if (!groupedLogs[dateKey]) {
              groupedLogs[dateKey] = [];
            }

            // 로그를 한 줄씩 처리
            lines.forEach((line) => {
              const timestampMatch = line.match(
                /^\[(\d{2}:\d{2}:\d{2}\.\d{3})\]/,
              );
              if (timestampMatch) {
                const timestamp = timestampMatch[1].trim();

                // 각 항목을 문자열에서 추출
                const E_TYPE = line.match(/E_TYPE\s*:\s*(\w+)/)?.[1] || '';
                if (E_TYPE === '') {
                  return;
                }
                const E_CODE = line.match(/E_CODE\s*:\s*(\d+)/)?.[1] || '';
                const E_NAME =
                  line.match(/E_NAME\s*:\s*([\w\s_]+)/)?.[1].trim() || '';
                const E_DESC =
                  line
                    .match(/E_DESC\s*:\s*(.*?)(?=\s*\|\s*E_SOLN)/)?.[1]
                    .trim() || '';
                const E_SOLN =
                  line.match(/E_SOLN\s*:\s*(.*)/)?.[1].trim() || '';

                // 로그를 groupedLogs에 추가
                groupedLogs[dateKey].push({
                  timestamp,
                  E_TYPE,
                  E_CODE,
                  E_NAME,
                  E_DESC,
                  E_SOLN,
                });
              }
            });
          }
        }
      });

      // 오늘 날짜를 가장 위에 배치
      const sortedLogs = Object.keys(groupedLogs)
        .sort((a, b) => {
          if (a === todayStartDate.format('YYYY-MM-DD')) return -1;
          if (b === todayStartDate.format('YYYY-MM-DD')) return 1;
          return moment(b).isBefore(moment(a)) ? -1 : 1;
        })
        .reduce((acc, key) => {
          acc[key] = groupedLogs[key];
          return acc;
        }, {});

      return sortedLogs;
    } catch (error) {
      if (error instanceof HttpException) {
        return error;
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

  getAllErrorLogs(folderPath: string): any {
    try {
      const currentDate = moment(); // 현재 날짜
      const todayStartDate = moment().startOf('day'); // 오늘 0시
      const groupedLogs: Record<
        string,
        {
          timestamp: string;
          E_CODE: string;
          E_NAME: string;
          E_TYPE: string;
          E_DESC: string;
          E_SOLN: string;
        }[]
      > = {};

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

      let totalLogs = 0; // 전체 로그 개수
      const searchDate = currentDate.clone(); // 검색 시작 날짜
      const maxSearchLimit = 30; // 검색 제한일 설정 (30일)
      let searchAttempts = 0;

      // 로그 파일 처리 함수
      const processLogsForDate = (fileDate: moment.Moment, file: string) => {
        const dateKey = fileDate.format('YYYY-MM-DD');
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        lines.reverse();

        if (!groupedLogs[dateKey]) {
          groupedLogs[dateKey] = [];
        }

        lines.forEach((line) => {
          const timestampMatch = line.match(/^\[(\d{2}:\d{2}:\d{2}\.\d{3})\]/);
          if (timestampMatch) {
            const timestamp = timestampMatch[1].trim();

            const E_TYPE = line.match(/E_TYPE\s*:\s*(\w+)/)?.[1] || '';
            if (E_TYPE === '') {
              return;
            }
            const E_CODE = line.match(/E_CODE\s*:\s*(\d+)/)?.[1] || '';
            const E_NAME =
              line.match(/E_NAME\s*:\s*([\w\s_]+)/)?.[1].trim() || '';
            const E_DESC =
              line.match(/E_DESC\s*:\s*(.*?)(?=\s*\|\s*E_SOLN)/)?.[1].trim() ||
              '';
            const E_SOLN = line.match(/E_SOLN\s*:\s*(.*)/)?.[1].trim() || '';

            groupedLogs[dateKey].push({
              timestamp,
              E_TYPE,
              E_CODE,
              E_NAME,
              E_DESC,
              E_SOLN,
            });

            totalLogs++;
          }
        });
      };

      // 로그 파일을 계속 검색하여 처리
      while (totalLogs < 10 && searchAttempts < maxSearchLimit) {
        const files = fs.readdirSync(folderPath);
        files.forEach((file) => {
          const match = file.match(/^(\d{4})_(\d{2})_(\d{2})_Error_Log\.txt$/);
          if (match) {
            const fileDate = moment(
              `${match[1]}-${match[2]}-${match[3]}`,
              'YYYY-MM-DD',
            );

            if (fileDate.isSame(searchDate, 'day')) {
              processLogsForDate(fileDate, file);
            }
          }
        });

        // 다음 날짜로 이동
        searchDate.subtract(1, 'day');
        searchAttempts++;
      }

      const sortedLogs = Object.keys(groupedLogs)
        .sort((a, b) => {
          if (a === todayStartDate.format('YYYY-MM-DD')) return -1;
          if (b === todayStartDate.format('YYYY-MM-DD')) return 1;
          return moment(b).isBefore(moment(a)) ? -1 : 1;
        })
        .reduce((acc, key) => {
          acc[key] = groupedLogs[key];
          return acc;
        }, {});

      return sortedLogs;
    } catch (error) {
      if (error instanceof HttpException) {
        return error;
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
