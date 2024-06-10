// backup.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupDto } from './backup.dto';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post('post')
  async createBackup(@Body() backupDto: BackupDto): Promise<void> {
    await this.backupService.backupData(backupDto);
  }
}
