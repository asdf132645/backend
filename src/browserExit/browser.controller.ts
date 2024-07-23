import { Controller, Get } from '@nestjs/common';
import { BrowserService } from './browser.service';

@Controller('browser')
export class BrowserController {
  constructor(private readonly browserService: BrowserService) {}

  @Get('close-edge')
  async closeEdgeBrowser(): Promise<string> {
    try {
      await this.browserService.closeEdgeBrowser();
      return 'Edge 브라우저가 종료되었습니다.';
    } catch (error) {
      return `Edge 브라우저 종료 중 오류가 발생했습니다: ${error.message}`;
    }
  }

  @Get('close-node')
  async closeNodeProcesses(): Promise<string> {
    try {
      await this.browserService.closeNodeProcesses();
      return '모든 node.exe 프로세스가 종료되었습니다.';
    } catch (error) {
      return `node.exe 프로세스 종료 중 오류가 발생했습니다: ${error.message}`;
    }
  }

  @Get('close-all')
  async closeAllProcesses(): Promise<string> {
    try {
      await this.browserService.closeAllProcesses();
      return 'Edge 브라우저와 모든 node.exe 프로세스가 종료되었습니다.';
    } catch (error) {
      return `프로세스 종료 중 오류가 발생했습니다: ${error.message}`;
    }
  }
}
