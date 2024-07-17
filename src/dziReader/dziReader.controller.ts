import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('dzi')
export class DziController {
  @Post('send')
  async getDziFile(@Body('filePath') filePath: string, @Res() res: Response) {
    try {
      // 파일 경로 생성
      const fullFilePath = filePath; // 클라이언트에서 전달한 파일 경로를 그대로 사용

      // 파일 존재 여부 확인
      if (!fs.existsSync(fullFilePath)) {
        return res.status(404).send('DZI file not found');
      }

      // DZI 파일 전송
      return res.sendFile(fullFilePath);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Internal Server Error');
    }
  }
}
