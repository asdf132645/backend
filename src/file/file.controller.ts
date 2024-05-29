// src/file/file.controller.ts
import { Controller, Get, Query, HttpStatus } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('read')
  async readFile(
    @Query('path') path: string,
    @Query('filename') filename: string,
  ): Promise<any> {
    const fullPath = `${path}/${filename}`;
    const result = await this.fileService.readFile(fullPath);

    if (result.success) {
      return { success: true, data: result.data, code: HttpStatus.OK };
    } else {
      return {
        success: false,
        message: result.message,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
