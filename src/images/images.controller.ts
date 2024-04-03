import {
  Controller,
  Get,
  Query,
  Res,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { exec } from 'child_process';

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

  @Get('bm')
  async getBmImage(
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

      // 이미지 최적화
      exec(
        `npx imagemin "${absoluteImagePath}" --out-dir="${folder}"`,
        (error) => {
          if (error) {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send('Error optimizing the image');
            return;
          }

          // 최적화된 이미지 파일 경로
          const optimizedImagePath = path.join(
            folder,
            path.basename(absoluteImagePath),
          );

          // 최적화된 이미지를 클라이언트에 전송
          const fileStream = fs.createReadStream(optimizedImagePath);
          fileStream.pipe(res);
        },
      );
    } catch (error) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send('File not found or permission issue');
    }
  }

  @Get('move')
  moveImage(
    @Query('sourceFolder') sourceFolder: string,
    @Query('destinationFolder') destinationFolder: string,
    @Query('imageName') imageName: string,
    @Res() res: Response,
  ) {
    if (!sourceFolder || !destinationFolder || !imageName) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid parameters');
    }

    // 원본 이미지 경로와 대상 이미지 경로를 받아와서 절대 경로로 조합
    const absoluteSourcePath = path.join(sourceFolder, imageName);
    const absoluteDestinationPath = path.join(destinationFolder, imageName);

    try {
      fs.accessSync(absoluteSourcePath, fs.constants.R_OK);
      fs.renameSync(absoluteSourcePath, absoluteDestinationPath); // 이미지 이동

      res.status(HttpStatus.OK).send('Image moved successfully');
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error moving the image');
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file) {
    // 저장할 디렉토리 설정
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // 파일 저장
    const fileName = `${Date.now()}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);

    // 저장된 파일 경로를 반환
    return { imagePath: filePath };
  }
}
