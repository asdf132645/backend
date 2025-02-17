// src/folder/folder.controller.ts

import { Controller, Get } from '@nestjs/common';
import * as fs from 'fs';

@Controller('folder')
export class FolderController {
  @Get('drives')
  getDrives(): string[] {
    try {
      const drives = this.getWindowsDrives();
      return drives
        .filter((drive) => !!drive)
        .map((item) => item.replaceAll('\\', '')); // 빈 문자열 제거
    } catch (error) {
      throw new Error(`Failed to get drives: ${error.message}`);
    }
  }

  private getWindowsDrives(): string[] {
    const possibleDrives = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      .split('')
      .map((letter) => `${letter}:\\`);
    return possibleDrives.filter((drive) => {
      try {
        fs.accessSync(drive, fs.constants.R_OK);
        return true;
      } catch {
        return false;
      }
    });
    // return new Promise((resolve, reject) => {
    //   exec(
    //     'powershell -NoProfile -Command "Get-PSDrive -PSProvider FileSystem | Select-Object -ExpandProperty Root"',
    //     (error, stdout) => {
    //       if (error) {
    //         return reject(`Failed to get Windows drives: ${error.message}`);
    //       }
    //       const driveLetters = stdout
    //         .split('\r\n')
    //         .filter((line) => line.trim() !== '')
    //         .map((letter) => letter.replaceAll('\\', ''));
    //       resolve(driveLetters);
    //     },
    //   );
    // });
  }
}
