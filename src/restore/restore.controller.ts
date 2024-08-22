import { Controller, Post, Body } from '@nestjs/common';
import { RestoreService } from './restore.service';

@Controller('restore')
export class RestoreController {
  constructor(private readonly restoreService: RestoreService) {}

  @Post('execute')
  async executeSql(
    @Body()
    body: {
      fileName: string;
      saveFilePath: string;
      backupFilePath: string;
    },
  ) {
    await this.restoreService.changeDatabaseAndExecute(body);
    return { message: 'SQL file executed successfully' };
  }

  @Post('checkDuplicatedData')
  async checkDuplicatedData(
    @Body()
    body: {
      fileName: string;
      saveFilePath: string;
      backupFilePath: string;
    },
  ) {
    return await this.restoreService.checkDuplicatedData(body);
  }
}
