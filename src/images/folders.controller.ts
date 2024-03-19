import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import path from 'path';

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
      const files = fs.readdirSync(folderPath);
      const hasDziOrJpg = files.some(
        (file) => file.includes('dzi') || file.includes('jpg'),
      );
      if (hasDziOrJpg) {
        const folderPathUrl = new URL(folderPath).searchParams.get(
          'folderPath',
        );

        const extractedPath = folderPathUrl.substring(
          0,
          folderPathUrl.lastIndexOf('/') + 1,
        );
        const lastSlashIndex = folderPath.lastIndexOf('/');
        const imageName = folderPath.substring(lastSlashIndex + 1);
        console.log(imageName);
        console.log(extractedPath);
        const absoluteImagePath = path.join(extractedPath, imageName);
        //있는경우
        fs.accessSync(absoluteImagePath, fs.constants.R_OK);
        const fileStream = fs.createReadStream(absoluteImagePath);
        fileStream.pipe(res);
      } else {
        res.status(HttpStatus.OK).json(files);
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('폴더 못읽음');
    }
  }
}
