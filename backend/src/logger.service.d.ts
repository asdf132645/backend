import { Logger } from '@nestjs/common';
export declare class LoggerService extends Logger {
    private readonly logFileName;
    private readonly logDir;
    private readonly logFilePath;
    constructor();
    log(message: string): void;
    error(message: string, trace?: string): void;
    warn(message: string): void;
    debug(message: string): void;
    private ensureLogDirectoryExists;
    private deleteLogFileIfOlderThanTwoDays;
}
