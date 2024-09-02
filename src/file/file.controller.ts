// src/file/file.controller.ts
import { Controller, Get, Query, HttpStatus, Post, Body } from '@nestjs/common';
import { FileService } from './file.service';
import * as path from 'path';
import * as fs from 'fs';

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

  @Get('check-file-exists')
  checkFileExists(
    @Query('directoryPath') directoryPath: string,
    @Query('filename') filename: string,
  ): any {
    if (!directoryPath || !filename) {
      return {
        success: false,
        message:
          'Both directoryPath and filename query parameters are required.',
        code: HttpStatus.BAD_REQUEST,
      };
    }

    const fileExists = this.fileService.checkFileExists(
      directoryPath,
      filename,
    );
    return {
      success: true,
      fileExists,
      code: HttpStatus.OK,
    };
  }

  @Get('create-directory')
  createDirectory(@Query('path') directoryPath: string) {
    if (!directoryPath) {
      return 'Path parameter is required';
    }
    const fullPath = path.resolve(directoryPath);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    return `Directory created at ${directoryPath} (if it did not already exist)`;
  }

  @Post('createFile')
  async createFile(
    @Body() body: { path: string; filename: string; content: string },
  ) {
    const { path, filename, content } = body;
    try {
      // 파일 생성
      fs.writeFileSync(`${path}/${filename}`, content);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('cbcSaveData')
  async cbcSaveData(@Body() body: { data: any; filePath: string }) {
    const { data, filePath } = body;

    try {
      await this.fileService.cbcSaveDataService(filePath, data);
      return { success: true };
    } catch (error) {
      console.error('Error saving data:', error);
      return { success: false, error: error };
    }
  }
}
