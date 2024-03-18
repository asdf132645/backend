import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('folders')
export class FoldersController {
  @Get()
  getFilesInFolder(
    @Query('folderPath') folderPath: string,
    @Res() res: Response,
  ) {
    if (!folderPath) {
      return res.status(HttpStatus.BAD_REQUEST).send('폴더 못찾음');
    }

    try {
      // 폴더 내의 파일 목록을 읽어옵니다.
      const files = fs.readdirSync(folderPath);
      res.status(HttpStatus.OK).json(files);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('폴더 못읽음');
    }
  }
}
