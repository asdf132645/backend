// backup.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupDto } from './backup.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Controller('backup')
export class BackupController {
  constructor(
    private readonly backupService: BackupService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post('post')
  async createBackup(@Body() backupDto: any): Promise<void> {
    const { dayQuery } = backupDto;
    await this.redis.del(dayQuery);
    await this.backupService.backupData(backupDto);
  }

  @Post('check')
  async checkIsPossibleToBackup(
    @Body() backupDto: BackupDto,
  ): Promise<boolean> {
    return await this.backupService.checkIsPossibleToBackup(backupDto);
  }
}
