import {
  Body,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JsonReaderService } from './jsonReader.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as pako from 'pako';

@Controller('jsonReader')
export class JsonReaderController {
  constructor(private readonly jsonReaderService: JsonReaderService) {}

  @Post('send')
  async getJsonFile(@Body('fullPath') fullPath: string): Promise<any> {
    return this.jsonReaderService.readJsonFile(fullPath);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: any,
    @Query('filePath') filePath: string,
  ): Promise<any> {
    try {
      // 파일을 저장할 경로와 이름
      const savePath = `${filePath}`;

      // 데이터를 압축 해제
      const inflatedData = pako.inflate(file.buffer, { to: 'string' });

      // 압축 해제된 데이터를 저장
      fs.writeFileSync(savePath, inflatedData);

      return {
        message: 'File uploaded and saved successfully.',
        filePath: savePath, // 저장된 파일의 경로를 클라이언트에게 응답
      };
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to upload and save file.');
    }
  }
}
