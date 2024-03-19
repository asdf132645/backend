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
      // wmic 명령어를 사용하여 Windows에서 실제로 설치된 드라이브 목록 가져오기
      const wmicOutput = execSync('wmic logicaldisk get caption').toString();
      const driveLetters = wmicOutput
        .split('\r\n')
        .slice(1, -1)
        .map((line) => line.trim());

      return driveLetters;
    } catch (error) {
      throw new Error(`Failed to get Windows drives: ${error.message}`);
    }
  }

  private getUnixLikeDrives(): string[] {
    return ['/'];
  }
}
