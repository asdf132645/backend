import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as os from 'os';

@Injectable()
export class RemainingCountService {
  executeApplication(): Promise<string> {
    return new Promise((resolve, reject) => {
      const userHomeDir = os.homedir();
      const appPath = `"${userHomeDir}\\AppData\\Local\\Programs\\UIMD\\UIMD_Backend_Install\\UIMD_CountCharger.exe"`;

      exec(appPath, (error, stdout, stderr) => {
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
}
