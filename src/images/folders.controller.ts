import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs'; // path 모듈 추가

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
      const fullPath = path.join(folderPath); // 전체 경로 생성
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        const files = fs.readdirSync(fullPath);
        res.status(HttpStatus.OK).json(files);
      } else if (stats.isFile()) {
        const fileStream = fs.createReadStream(fullPath);
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
