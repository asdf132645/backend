import { Controller, Post, Body } from '@nestjs/common';
import { RestoreService } from './restore.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Controller('restore')
export class RestoreController {
  constructor(
    private readonly restoreService: RestoreService,
    // @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post('execute')
  async executeSql(
    @Body()
    body: {
      fileName: string;
      saveFilePath: string;
      backupFilePath: string;
      dayQuery: string;
    },
  ) {
    // this.redis.del(body.dayQuery);
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
