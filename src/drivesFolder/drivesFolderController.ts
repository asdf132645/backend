// src/folder/folder.controller.ts

import { Controller, Get } from '@nestjs/common';
import { execSync } from 'child_process';
import * as os from 'os';

@Controller('folder')
export class FolderController {
  @Get('drives')
  getDrives(): string[] {
    try {
      const drives =
        os.platform() === 'win32'
          ? this.getWindowsDrives()
          : this.getUnixLikeDrives();
      return drives.filter((drive) => !!drive); // 빈 문자열 제거
    } catch (error) {
      throw new Error(`Failed to get drives: ${error.message}`);
    }
  }

  private getWindowsDrives(): string[] {
    try {
      const powershellOutput = execSync(
        'powershell -Command "Get-PSDrive -PSProvider FileSystem | Select-Object -ExpandProperty Root"',
      ).toString();
      const driveLetters = powershellOutput
        .split('\r\n')
        .filter((line) => line.trim() !== '');

      const convertedDriveLetters = driveLetters.map((letter: string) =>
        letter.replaceAll('\\', ''),
      );
      return convertedDriveLetters;
    } catch (error) {
      throw new Error(`Failed to get Windows drives: ${error.message}`);
    }
  }

  private getUnixLikeDrives(): string[] {
    return ['/'];
  }
}
