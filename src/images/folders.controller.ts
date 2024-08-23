import {
  Controller,
  Get,
  Query,
  Res,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs'; // path 모듈 추가
import * as sharp from 'sharp';
import { mkdir, readdir, rename } from 'fs-extra';

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
          // 이미지 파일인 경우, sharp를 사용하여 최적화
          try {
            const optimizedStream = sharp(fullPath, { limitInputPixels: false })
              .toFormat('webp') // 이미지를 WebP 형식으로 변환
              .jpeg({ quality: 30 });
            // res.setHeader('Cache-Control', 'public, max-age=86400');

            // 최적화된 이미지를 스트림으로 반환합니다.
            optimizedStream
              .on('error', () => {
                res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .send('이미지 처리 중 오류가 발생했습니다.');
              })
              .pipe(res);
          } catch (sharpError) {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send('이미지 처리 중 오류가 발생했습니다.');
          }
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
  @Post('check-and-move-images')
  async checkAndMoveImages(
    @Body() body: { folderPath: string; wbcInfo: any[] },
  ) {
    const { folderPath, wbcInfo } = body;

    try {
      for (const item of wbcInfo) {
        const folderName = `${item.id}_${item.title}`;
        const sourceFolderPath = path.join(folderPath, folderName);

        // 폴더가 존재하는지 확인
        if (!fs.existsSync(sourceFolderPath)) {
          // console.log(
          //   `Source folder ${folderName} does not exist at path ${sourceFolderPath}.`,
          // );
          continue;
        }

        // 폴더 내의 파일 목록 가져오기
        const files = await readdir(sourceFolderPath);

        // 배열에 명시된 파일 목록
        const validFileNames = new Set(
          item.images.map((img: { fileName: string }) => img.fileName),
        );

        for (const fileName of files) {
          const sourceFilePath = path.join(sourceFolderPath, fileName);

          // 배열에 명시된 파일 목록에 파일이 포함되어 있는지 확인
          if (!validFileNames.has(fileName)) {
            // 목적지 폴더 찾기
            const destinationFolder = wbcInfo.find((info) =>
              info.images.some(
                (img: { fileName: string }) => img.fileName === fileName,
              ),
            );

            if (destinationFolder) {
              const destinationFolderName = `${destinationFolder.id}_${destinationFolder.title}`;
              const destinationFolderPath = path.join(
                folderPath,
                destinationFolderName,
              );

              if (!fs.existsSync(destinationFolderPath)) {
                await mkdir(destinationFolderPath, { recursive: true });
              }

              const destinationFilePath = path.join(
                destinationFolderPath,
                fileName,
              );
              console.log(
                `Moving file from ${sourceFilePath} to ${destinationFilePath}`,
              );

              // 파일 이동
              await rename(sourceFilePath, destinationFilePath);
              console.log(`File ${fileName} moved to ${destinationFolderPath}`);
            } else {
              // console.log(`No valid destination found for file ${fileName}.`);
            }
          } else {
            // console.log(
            //   `File ${fileName} is valid in ${folderName}. No action needed.`,
            // );
          }
        }
      }

      return { message: 'Files checked and moved successfully.' };
    } catch (error) {
      console.log('Error:', error.message);
      // throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
