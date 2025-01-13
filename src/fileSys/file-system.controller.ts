// file-system.controller.ts

import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileSystemService } from './file-system.service';

@Controller('filesystem')
export class FileSystemController {
  constructor(private readonly fileSystemService: FileSystemService) {}

  @Post('create-folder')
  async createFolder(@Body() body: { path: string }): Promise<string> {
    const { path } = body;
    await this.fileSystemService.createFolder(path);
    return `Folder created at ${path}`;
  }

  @Delete('delete-folder')
  async deleteFolder(@Body() body: { path: string }): Promise<string> {
    const { path } = body;
    await this.fileSystemService.deleteFolder(path);
    return `Folder deleted at ${path}`;
  }

  @Post('copy')
  async copyFile(@Body() body: { source: string; destination: string }) {
    await this.fileSystemService.copyFile(body.source, body.destination);
    return { message: 'File copied successfully' };
  }

  @Post('cleanup')
  async cleanupFiles(
    @Body() body: { directoryPath: string; keyword: string },
  ): Promise<string> {
    const { directoryPath, keyword } = body;

    try {
      await this.fileSystemService.cleanupOldFiles(directoryPath, keyword);
      return 'File cleanup completed successfully.';
    } catch (error) {
      console.error('Error during file cleanup:', error);
      return 'An error occurred during file cleanup.';
    }
  }

  @Post('existsFile')
  async checkFile(
    @Body() body: { directoryPath: string; keyword: string },
  ): Promise<string> {
    const { directoryPath, keyword } = body;

    try {
      const fileExists = await this.fileSystemService.checkFileExistence(
        directoryPath,
        keyword,
      );
      if (fileExists) {
        return 'exists';
      } else {
        return 'NoFile';
      }
    } catch (error) {
      console.error('Error during file existence check:', error);
      return 'An error occurred while checking file existence.';
    }
  }

  @Get('fileSearch')
  async getFiles(
    @Query('directoryPath') directoryPath: string,
    @Query('searchString') searchString: string,
  ) {
    return this.fileSystemService.findFilesByString(
      directoryPath,
      searchString,
    );
  }

  @Get('errLogsRead')
  getLogs(@Query('folderPath') folderPath: string): any {
    if (!folderPath) {
      throw new HttpException(
        {
          message: 'folderPath 파라미터를 제공해야 합니다.',
          error: 'Missing Parameter',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const logs = this.fileSystemService.getLogs(folderPath);
    return logs;
  }

  @Get('readAllErrorLogs')
  getAllErrorLogs(@Query('folderPath') folderPath: string): any {
    if (!folderPath) {
      console.error('folderPath parameter is missing');
    }

    const logs = this.fileSystemService.getAllErrorLogs(folderPath);
    return logs;
  }
}
