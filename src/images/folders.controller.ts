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
      const stats = fs.statSync(folderPath);
      if (stats.isDirectory()) {
        const files = fs.readdirSync(folderPath);
        res.status(HttpStatus.OK).json(files);
      } else if (stats.isFile()) {
        const fileStream = fs.createReadStream(folderPath);
        fileStream.pipe(res);
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('잘못된 경로입니다.');
      }
    } catch (error) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send('파일 또는 폴더를 찾을 수 없습니다.');
    }
  }
}
