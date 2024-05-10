import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs'; // path 모듈 추가
import * as sharp from 'sharp';

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

  @Get('getFilesInFolderWhole')
  getFilesInFolderWhole(
    @Query('folderPath') folderPath: string,
    @Res() res: Response,
  ) {
    if (!folderPath) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('폴더를 찾을 수 없습니다.');
    }

    try {
      const fullPath = path.join(folderPath); // 전체 경로 생성
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        const files = fs.readdirSync(fullPath);
        res.status(HttpStatus.OK).json(files);
      } else if (stats.isFile()) {
        // 파일의 확장자를 확인합니다.
        const fileExtension = path.extname(fullPath).toLowerCase();

        if (
          ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif', '.bmp'].includes(
            fileExtension,
          )
        ) {
          // 이미지 파일인 경우, sharp를 사용하여 최적화합니다.
          const optimizedStream = sharp(fullPath)
            .toFormat('webp') // 이미지를 WebP 형식으로 변환
            .jpeg({ quality: 30 });

          // 최적화된 이미지를 스트림으로 반환합니다.
          optimizedStream.pipe(res);
        } else {
          // 이미지 파일이 아닌 경우 원본 파일을 스트림으로 반환합니다.
          const fileStream = fs.createReadStream(fullPath);
          fileStream.pipe(res);
        }
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('잘못된 경로입니다.');
      }
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.NOT_FOUND)
        .send('파일 또는 폴더를 찾을 수 없습니다.');
    }
  }
}
