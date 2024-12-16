import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';

@Injectable()
export class LoggerService extends Logger {
  private readonly baseLogDir = 'D:\\UIMD_Data\\UI_Log\\BACKEND_LOG';
  private lastMessages = {
    log: null,
    error: null,
    warn: null,
    debug: null,
    cbcLis: null,
    ping: null,
    login: null,
  }; // 각 로그 레벨별 마지막 메시지 저장

  constructor() {
    super();
    this.ensureBaseLogDirectoryExists();
  }

  log(message: string) {
    if (this.isDuplicateMessage('log', message)) return;
    super.log(message);
    this.writeLog('log', message);
  }

  error(message: string, trace?: string) {
    const fullMessage = trace ? `${message}\n${trace}` : message;
    if (this.isDuplicateMessage('error', fullMessage)) return;
    super.error(message, trace);
    this.writeLog('error', fullMessage);
  }

  warn(message: string) {
    if (this.isDuplicateMessage('warn', message)) return;
    super.warn(message);
    this.writeLog('warn', message);
  }

  debug(message: string) {
    if (this.isDuplicateMessage('debug', message)) return;
    super.debug(message);
    this.writeLog('debug', message);
  }

  cbcLis(message: string) {
    if (this.isDuplicateMessage('cbcLis', message)) return;
    super.log(message);
    this.writeLog('cbcLis', message);
  }

  ping(message: string) {
    if (this.isDuplicateMessage('ping', message)) return;
    super.log(message);
    this.writeLog('ping', message);
  }

  logic(message: string) {
    if (this.isDuplicateMessage('logic', message)) return;
    super.log(message);
    this.writeLog('logic', message);
  }

  private isDuplicateMessage(level: string, message: string): boolean {
    if (this.lastMessages[level] === message) {
      return true; // 중복 메시지일 경우 true 반환
    }
    this.lastMessages[level] = message; // 마지막 메시지를 갱신
    return false; // 중복이 아니면 false 반환
  }

  private formattedTime(date: Date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `[${hours}:${minutes}:${seconds}.${milliseconds}]`;
  }

  private writeLog(level: string, message: string) {
    const now = new Date();
    const dateString = moment(now).format('YYYY-MM-DD'); // 현재 로컬 시간 기준으로 날짜 생성
    const logDir = path.join(this.baseLogDir, level);

    this.ensureDirectoryExists(logDir);

    const logFilePath = path.join(logDir, `${dateString}_${level}.txt`);

    this.ensureFileExists(logFilePath);

    const formattedMessage = `${this.formattedTime(now)} - ${message}`;
    fs.appendFileSync(logFilePath, `${formattedMessage}\n`);
  }

  private ensureBaseLogDirectoryExists() {
    this.ensureDirectoryExists(this.baseLogDir);
  }

  private ensureDirectoryExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`로그 디렉토리가 존재하지 않아서 생성: ${dir}`);
    }
  }

  private ensureFileExists(file: string) {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, '');
    }
  }
}
