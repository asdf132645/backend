import { Controller, Post, Body } from '@nestjs/common';
import { DownloadService } from './download.service';
import { DownloadDto, DownloadReturn } from './download.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Controller('download')
export class DownloadController {
  constructor(
    private readonly downloadService: DownloadService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post('post')
  async createBackup(@Body() downloadDto: DownloadDto): Promise<any> {
    const { dayQuery } = downloadDto;
    await this.redis.del(dayQuery);
    return await this.downloadService.downloadOperation(downloadDto);
  }

  @Post('check')
  async checkIsPossibleToDownload(
    @Body()
    downloadDto: Pick<
      DownloadDto,
      'startDate' | 'endDate' | 'destinationDownloadPath' | 'originDownloadPath'
    >,
  ): Promise<DownloadReturn> {
    return await this.downloadService.checkIsPossibleToDownload(downloadDto);
  }

  @Post('openDrive')
  async openDrive(
    @Body() downloadDto: Pick<DownloadDto, 'originDownloadPath'>,
  ): Promise<string[] | string> {
    return await this.downloadService.openDrive(downloadDto);
  }
}
