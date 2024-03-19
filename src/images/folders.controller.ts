import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

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
      const stats = fs.statSync(folderPath); // 파일 또는 폴더의 정보를 가져옴
      if (stats.isDirectory()) {
        // 폴더인 경우 폴더 내 파일 목록을 반환
        const files = fs.readdirSync(folderPath);
        res.status(HttpStatus.OK).json(files);
      } else if (stats.isFile()) {
        // 파일인 경우 해당 파일을 스트리밍
        const fileStream = fs.createReadStream(folderPath);
        fileStream.pipe(res);
      } else {
        // 파일도 폴더도 아닌 경우 에러 반환
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('잘못된 경로입니다.');
      }
    } catch (error) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send('파일 또는 폴더를 찾을 수 없습니다.');
    }
  }
}
