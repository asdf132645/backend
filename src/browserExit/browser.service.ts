import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class BrowserService {
  closeEdgeBrowser(): Promise<void> {
    return new Promise((resolve, reject) => {
      const command = 'taskkill /IM msedge.exe /F';

      exec(command, (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        console.log(stdout);
        resolve();
      });
    });
  }

  closeNodeProcesses(): Promise<void> {
    return new Promise((resolve, reject) => {
      const command = 'taskkill /IM node.exe /F';

      exec(command, (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        console.log(stdout);
        resolve();
      });
    });
  }

  closeAllProcesses(): Promise<void> {
    return Promise.all([
      this.closeEdgeBrowser(),
      this.closeNodeProcesses(),
    ]).then(
      () => {},
      (error) => {
        throw new Error(
          `프로세스 종료 중 오류가 발생했습니다: ${error.message}`,
        );
      },
    );
  }
}
