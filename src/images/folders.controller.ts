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

    const lastSeparatorIndex = Math.max(
      folderPath.lastIndexOf('\\'),
      folderPath.lastIndexOf('/'),
    );
    const imageName = folderPath.substring(lastSeparatorIndex + 1);
    const folderPathValue = folderPath.substring(0, lastSeparatorIndex + 1);

    if (imageName) {
      const absoluteImagePath = path.join(folderPathValue, imageName);
      try {
        fs.accessSync(absoluteImagePath, fs.constants.R_OK);
        const fileStream = fs.createReadStream(absoluteImagePath);
        fileStream.pipe(res);
      } catch (error) {
        res
          .status(HttpStatus.NOT_FOUND)
          .send('File not found or permission issue');
      }
    } else {
      try {
        const files = fs.readdirSync(folderPath);
        res.status(HttpStatus.OK).json(files);
      } catch (error) {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('폴더를 읽을 수 없습니다.');
      }
    }
  }
}
