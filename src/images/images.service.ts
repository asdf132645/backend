// images.service.ts

import { Injectable, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import * as Jimp from 'jimp';

@Injectable()
export class ImagesService {
  constructor() {}

  async getImageWbc(folder: string, imageName: string, res: Response) {
    if (!folder || !imageName) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid parameters');
    }

    // 이미지 경로를 받아와서 절대 경로로 조합
    const absoluteImagePath = path.join(folder, imageName);

    try {
      fs.accessSync(absoluteImagePath, fs.constants.R_OK);

      // bmp 이미지를 jpeg로 변환하여 압축
      const jpegImageBuffer = await this.convertBmpToJpeg(absoluteImagePath);

      // 압축된 이미지를 클라이언트에게 전송
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(jpegImageBuffer);
    } catch (error) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send('File not found or permission issue');
    }
  }

  // bmp 이미지를 jpeg로 변환하는 함수
  private async convertBmpToJpeg(absoluteImagePath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      sharp(absoluteImagePath)
        .jpeg({ quality: 80 }) // JPEG 압축 품질 조정
        .toBuffer((err, buffer) => {
          if (err) {
            reject(err);
          } else {
            resolve(buffer);
          }
        });
    });
  }

  async convertImageToJPEG(imagePath: string): Promise<Buffer> {
    const image = await Jimp.read(imagePath);
    const buffer = await image.quality(60).getBufferAsync(Jimp.MIME_JPEG); // JPEG로 변환, 품질 설정 예시로 80%
    return buffer;
  }
}
