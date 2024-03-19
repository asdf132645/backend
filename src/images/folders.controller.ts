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
      const files = fs.readdirSync(folderPath);
      const hasDziOrJpg = files.some(
        (file) => file.includes('dzi') || file.includes('jpg'),
      );
      if (hasDziOrJpg) {
        //있는경우
        fs.accessSync(folderPath, fs.constants.R_OK);
        const fileStream = fs.createReadStream(folderPath);
        fileStream.pipe(res);
      } else {
        res.status(HttpStatus.OK).json(files);
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('폴더 못읽음');
    }
  }
}
