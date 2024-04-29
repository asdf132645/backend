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
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp';

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

  @Get('move')
  async moveImage(
    @Query('sourceFolders') sourceFolders: string,
    @Query('destinationFolders') destinationFolders: string,
    @Query('imageNames') imageNames: string,
    @Res() res: Response,
  ) {
    // 콤마로 구분된 문자열을 배열로 변환합니다.
    const sourceFoldersArray = sourceFolders ? sourceFolders.split(',') : [];
    const destinationFoldersArray = destinationFolders
      ? destinationFolders.split(',')
      : [];
    console.log(imageNames);
    const imageNamesArray = imageNames ? imageNames.split(',') : [];

    // 매개변수 길이가 일치하는지 확인합니다.
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

    // 이동 처리 결과를 응답으로 반환합니다.
    return res.status(HttpStatus.OK).json(moveResults);
  }

  @Post('moveClassImage')
  async moveClassImage(
    @Body('sourceFolders') sourceFolders: string,
    @Body('destinationFolders') destinationFolders: string,
    @Body('imageNames') imageNames: string,
    @Res() res: Response,
  ) {
    // 콤마로 구분된 문자열을 배열로 변환합니다.
    const sourceFoldersArray = sourceFolders ? sourceFolders.split(',') : [];
    const destinationFoldersArray = destinationFolders
      ? destinationFolders.split(',')
      : [];
    console.log(imageNames);
    const imageNamesArray = imageNames ? imageNames.split(',') : [];

    // 매개변수 길이가 일치하는지 확인합니다.
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

    // 이동 처리 결과를 응답으로 반환합니다.
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
