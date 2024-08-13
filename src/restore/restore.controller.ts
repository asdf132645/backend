import { Controller, Post, Body } from '@nestjs/common';
import { RestoreService } from './restore.service';

@Controller('restore')
export class RestoreController {
  constructor(private readonly restoreService: RestoreService) {}

  @Post('execute')
  async executeSql(@Body() body: { filePath: string; fileName: string }) {
    await this.restoreService.changeDatabaseAndExecute(body);
    return { message: 'SQL file executed successfully' };
  }

  @Post('checkDuplicatedData')
  async checkDuplicatedData(
    @Body() body: { filePath: string; fileName: string },
  ) {
    return await this.restoreService.checkDuplicatedData(body);
  }
}
