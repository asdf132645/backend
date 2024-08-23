import {
  Controller,
  Get,
  Query,
  Res,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp';
import { ImagesService } from './images.service';
import * as fs from 'fs-extra';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async getImage(
    @Query('folder') folder: string,
    @Query('imageName') imageName: string,
    @Res() res: Response,
  ) {
    if (!folder || !imageName) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid parameters');
    }
    const absoluteImagePath = path.join(folder, imageName);

    try {
      const imageBuffer = await sharp(absoluteImagePath)
        .resize({ width: 290, height: 290, fit: 'contain' }) // 필요에 따라 크기 조정
        .toFormat('webp')
        .webp({ quality: 10 }) // WebP 포맷으로 설정
        .toBuffer();
      // res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Content-Type', 'image/webp');
      res.send(imageBuffer);
    } catch (error) {
      console.error('Error processing image:', error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Image processing error');
    }
  }

  @Get('print')
  async getPrintImage(
    @Query('folder') folder: string,
    @Query('imageName') imageName: string,
    @Res() res: Response,
  ) {
    if (!folder || !imageName) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid parameters');
    }

    const absoluteImagePath = path.join(folder, imageName);
    try {
      // 파일 접근 - 1차 코드(되는 코드)
      fs.accessSync(absoluteImagePath, fs.constants.R_OK);
      const fileStream = fs.createReadStream(absoluteImagePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error processing image:', error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Image processing error');
    }
  }

  @Get('getImageRealTime')
  getImageRealTime(
    @Query('folder') folder: string,
    @Query('imageName') imageName: string,
    @Res() res: Response,
  ) {
    if (!folder || !imageName) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid parameters');
    }

    // 파일 경로를 절대 경로로 조합
    const absoluteImagePath = path.join(folder.replace(/\//g, '\\'), imageName);

    try {
      // 파일 접근 권한 확인
      fs.accessSync(absoluteImagePath, fs.constants.R_OK);

      // 이미지 변환 및 응답 설정
      const imageBuffer = fs.readFileSync(absoluteImagePath);
      // res.setHeader('Cache-Control', 'public, max-age=86400');
      res.contentType('image/bmp'); // BMP 이미지라면 Content-Type을 'image/bmp'로 설정
      res.send(imageBuffer);
    } catch (error) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send('File not found or permission issue');
    }
  }
  @Get('checkImageExists')
  checkImageExists(
    @Query('folder') folder: string,
    @Query('imageName') imageName: string,
    @Res() res: Response,
  ) {
    if (!folder || !imageName) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid parameters');
    }

    // 파일 경로를 절대 경로로 조합
    const absoluteImagePath = path.join(folder.replace(/\//g, '\\'), imageName);

    try {
      // 파일 접근 권한 확인
      fs.accessSync(absoluteImagePath, fs.constants.R_OK);

      // 파일이 존재할 경우 200 OK 반환
      res.status(HttpStatus.OK).send('File exists');
    } catch (error) {
      // 파일이 없거나 권한 문제로 접근 불가할 경우 404 Not Found 반환
      res
        .status(HttpStatus.NOT_FOUND)
        .send('File not found or permission issue');
    }
  }
  @Get('getImageWbc')
  async getImageWbc(
    @Query('folder') folder: string,
    @Query('imageName') imageName: string,
    @Res() res: Response,
  ) {
    await this.imagesService.getImageWbc(folder, imageName, res);
  }

  @Get('move')
  async moveImage(
    @Query('sourceFolders') sourceFolders: string,
    @Query('destinationFolders') destinationFolders: string,
    @Query('imageNames') imageNames: string,
    @Res() res: Response,
  ) {
    const sourceFoldersArray = sourceFolders ? sourceFolders.split(',') : [];
    const destinationFoldersArray = destinationFolders
      ? destinationFolders.split(',')
      : [];
    console.log(imageNames);
    const imageNamesArray = imageNames ? imageNames.split(',') : [];

    // 매개변수 길이가 일치하는지 확인
    if (
      sourceFoldersArray.length !== destinationFoldersArray.length ||
      sourceFoldersArray.length !== imageNamesArray.length
    ) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid parameters' });
    }

    // 이미지 이동 처리 결과를 저장할 객체
    const moveResults = {
      success: [],
      failed: [],
    };
    console.log(imageNamesArray);
    for (let i = 0; i < imageNamesArray.length; i++) {
      const imageName = imageNamesArray[i];
      const absoluteSourcePath = path.join(sourceFoldersArray[i], imageName);
      const absoluteDestinationPath = path.join(
        destinationFoldersArray[i],
        imageName,
      );
      console.log(absoluteSourcePath);
      try {
        // 파일 이동
        fs.accessSync(absoluteSourcePath, fs.constants.R_OK);
        fs.renameSync(absoluteSourcePath, absoluteDestinationPath);

        // 성공 목록에 추가
        moveResults.success.push(imageName);
      } catch (error) {
        // 실패 목록에 추가
        moveResults.failed.push({ imageName, error: error.message });
      }
    }

    // 이동 처리 결과를 응답으로 반환
    return res.status(HttpStatus.OK).json(moveResults);
  }

  @Post('moveClassImage')
  async moveClassImage(
    @Body('sourceFolders') sourceFolders: any,
    @Body('destinationFolders') destinationFolders: any,
    @Body('fileNames') imageNames: any,
    @Res() res: Response,
  ) {
    // 전달된 매개변수가 배열인지 확인하고 그대로 사용
    const sourceFoldersArray = Array.isArray(sourceFolders)
      ? sourceFolders
      : [];
    const destinationFoldersArray = Array.isArray(destinationFolders)
      ? destinationFolders
      : [];
    const imageNamesArray = Array.isArray(imageNames) ? imageNames : [];

    // 매개변수 길이 확인
    if (
      sourceFoldersArray.length !== destinationFoldersArray.length ||
      sourceFoldersArray.length !== imageNamesArray.length
    ) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid parameters' });
    }

    // 이미지 이동 처리 결과를 저장할 객체
    const moveResults = {
      success: [],
      failed: [],
    };

    // 비동기 큐 설정
    const concurrency = 10; // 동시에 처리할 파일 이동 작업 수
    let activeTasks = 0;
    const queue = [];

    // 파일 이동 함수
    const moveFile = async (
      source: string,
      destination: string,
      imageName: string,
    ) => {
      try {
        // 파일 접근 가능 확인
        await fs.promises.access(source, fs.constants.R_OK);
        // 파일 이동
        await fs.promises.rename(source, destination);
        // 성공 목록에 추가
        moveResults.success.push(imageName);
      } catch (error) {
        // 실패 목록에 추가
        moveResults.failed.push({ imageName, error: error.message });
      } finally {
        activeTasks--;
        processQueue(); // 큐 처리 재개
      }
    };

    // 큐 처리 함수
    const processQueue = () => {
      while (activeTasks < concurrency && queue.length > 0) {
        const { source, destination, imageName } = queue.shift();
        activeTasks++;
        moveFile(source, destination, imageName);
      }
    };

    // 큐에 작업 추가
    for (let i = 0; i < sourceFoldersArray.length; i++) {
      const source = path.join(sourceFoldersArray[i], imageNamesArray[i]);
      const destination = path.join(
        destinationFoldersArray[i],
        imageNamesArray[i],
      );
      queue.push({ source, destination, imageName: imageNamesArray[i] });
    }

    // 큐 처리 시작
    processQueue();

    // 모든 작업이 완료될 때까지 기다림
    await new Promise((resolve) => {
      const checkCompletion = setInterval(() => {
        if (activeTasks === 0 && queue.length === 0) {
          clearInterval(checkCompletion);
          resolve(null);
        }
      }, 100);
    });

    return res.status(HttpStatus.OK).json(moveResults);
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

  @Post('crop-image')
  async cropImage(@Body() requestBody: any, @Res() res: Response) {
    try {
      // 요청 바디로부터 좌표와 이미지 경로 가져오기
      const { startX, startY, endX, endY, originalImagePath, newImagePath } =
        requestBody;

      // 이미지 자르기
      await sharp(originalImagePath)
        .extract({
          left: startX,
          top: startY,
          width: endX - startX,
          height: endY - startY,
        })
        .toFile(newImagePath);

      // 저장한 새 이미지 경로 반환
      return res.status(200).send(newImagePath);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}
