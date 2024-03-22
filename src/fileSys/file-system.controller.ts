// file-system.controller.ts

import { Controller, Post, Body, Delete } from '@nestjs/common';
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
}
