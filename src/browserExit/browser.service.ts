import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
// import * as os from 'os';

@Injectable()
export class BrowserService {
  closeEdgeBrowser(): Promise<string> {
    return new Promise((resolve, reject) => {
      // const userHomeDir = os.homedir();
      // const appPath = `"${userHomeDir}\\AppData\\Local\\Programs\\UIMD\\web\\viewer\\kill_edge.exe"`;
      const appPath = `"D:\\UIMD_Data\\UI_ETC\\kill_edge.exe"`;
      const command = `powershell -Command "Start-Process '${appPath}' -Verb RunAs"`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
        } else if (stderr) {
          reject(`Stderr: ${stderr}`);
        } else {
          resolve(`Stdout: ${stdout}`);
        }
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
