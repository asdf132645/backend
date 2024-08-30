import { Controller, Post, Body } from '@nestjs/common';
import { UploadService } from './upload.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { UploadDto } from './upload.dto';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post('execute')
  async executeSql(
    @Body()
    body: UploadDto,
  ) {
    await this.redis.flushall();
    await this.uploadService.changeDatabaseAndExecute(body);
    return { message: 'SQL file executed successfully' };
  }

  @Post('checkDuplicatedData')
  async checkDuplicatedData(
    @Body()
    body: UploadDto,
  ) {
    return await this.uploadService.checkDuplicatedData(body);
  }
}