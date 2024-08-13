import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';

@Injectable()
export class LoggerService extends Logger {
  private readonly baseLogDir = 'D:\\UIMD_Data\\UI_Log\\BACKEND_LOG';

  constructor() {
    super();
    this.ensureBaseLogDirectoryExists();
  }

  log(message: string) {
    super.log(message);
    this.writeLog('log', message);
  }

  error(message: string, trace?: string) {
    super.error(message, trace);
    this.writeLog('error', `${message}\n${trace}`);
  }

  warn(message: string) {
    super.warn(message);
    this.writeLog('warn', message);
  }

  debug(message: string) {
    super.debug(message);
    this.writeLog('debug', message);
  }

  cbc(message: string) {
    super.log(message);
    this.writeLog('cbc', message);
  }

  private formattedTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    const formattedTimeStr = `[${hours}:${minutes}:${seconds}.${milliseconds}]`;
    return formattedTimeStr;
  };

  private writeLog(level: string, message: string) {
    const now = new Date();
    const date = moment(now).toDate();
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 날짜 문자열 생성
    const logDir = path.join(this.baseLogDir, level, dateString);

    this.ensureDirectoryExists(logDir);

    const logFilePath = path.join(logDir, `${dateString}.txt`);

    fs.appendFileSync(
      logFilePath,
      `${this.formattedTime(date)} - ${message}\n`,
    );
  }

  private ensureBaseLogDirectoryExists() {
    this.ensureDirectoryExists(this.baseLogDir);
  }

  private ensureDirectoryExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`로그 디렉토리가 존재하지 않아서 생성되었습니다: ${dir}`);
    }
  }
}
