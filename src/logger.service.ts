// logger.service.ts

import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService extends Logger {
  private readonly logFileName = 'logs.txt';
  private readonly logDir = path.join('src', 'logs');
  private readonly logFilePath = path.join(this.logDir, this.logFileName);

  constructor() {
    super();
    this.ensureLogDirectoryExists();
    this.deleteLogFileIfOlderThanTwoDays();
  }

  log(message: string) {
    super.log(message);

    // 파일에 로그 추가
    fs.appendFileSync(
      this.logFilePath,
      `${new Date().toISOString()} - ${message}\n`,
    );
  }

  error(message: string, trace?: string) {
    super.error(message, trace);

    // 파일에 에러 로그 추가
    fs.appendFileSync(
      this.logFilePath,
      `${new Date().toISOString()} - ERROR: ${message}\n${trace}\n`,
    );
  }

  warn(message: string) {
    super.warn(message);

    // 파일에 경고 로그 추가
    fs.appendFileSync(
      this.logFilePath,
      `${new Date().toISOString()} - WARNING: ${message}\n`,
    );
  }

  debug(message: string) {
    super.debug(message);

    // 파일에 디버그 로그 추가
    fs.appendFileSync(
      this.logFilePath,
      `${new Date().toISOString()} - DEBUG: ${message}\n`,
    );
  }

  private ensureLogDirectoryExists() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
      console.log('로그 디렉토리가 존재하지 않아서 생성되었습니다.');
    }
  }

  private deleteLogFileIfOlderThanTwoDays() {
    try {
      const stats = fs.statSync(this.logFilePath);
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      if (stats.birthtime < twoDaysAgo) {
        fs.unlinkSync(this.logFilePath);
        console.log('로그 파일이 2 일 전보다 오래되어 삭제되었습니다.');
      }
    } catch (error) {
      // 파일을 찾을 수 없거나 기타 오류 처리
      console.error(
        '로그 파일을 확인하거나 삭제하는 동안 오류가 발생했습니다:',
        error.message,
      );
    }
  }
}
