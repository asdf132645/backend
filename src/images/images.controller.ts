import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('images')
export class ImagesController {
  @Get()
  getImage(
    @Query('folder') folder: string,
    @Query('imageName') imageName: string,
    @Res() res: Response,
  ) {
    if (!folder || !imageName) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid parameters');
    }

    // 이미지 경로를 받아와서 절대 경로로 조합
    const absoluteImagePath = path.join(folder, imageName);

    try {
      fs.accessSync(absoluteImagePath, fs.constants.R_OK);
      const fileStream = fs.createReadStream(absoluteImagePath);
      fileStream.pipe(res);
    } catch (error) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send('File not found or permission issue');
    }
  }
}
