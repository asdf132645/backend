import { Controller, Post, Body, Res } from '@nestjs/common';
import { createCanvas, Image } from 'canvas';

@Controller('canvas')
export class CanvasController {
  @Post('convert-to-data-url')
  async convertToDataURL(
    @Body() canvas: any, // 캔버스 객체를 직접 받아옴
    @Res() response,
  ) {
    try {
      const width = canvas.width;
      const height = canvas.height;
      const imageData = canvas.toDataURL(); // 캔버스에서 이미지 데이터 얻어오기

      // 캔버스 생성
      const canvasObj = createCanvas(width, height);
      const ctx = canvasObj.getContext('2d');

      // 이미지 로드
      const img: any = new Image();
      img.onload = () => {
        // 이미지 그리기
        ctx.drawImage(img, 0, 0, width, height);

        // 데이터 URL로 변환
        const dataURL = canvasObj.toDataURL('image/png');

        // 변환된 데이터 URL 전송
        response.status(200).json({ dataURL });
      };
      img.onerror = (error) => {
        console.error('Error loading image:', error);
        response.status(500).json({ error: 'Internal Server Error' });
      };
      img.src = imageData;
    } catch (error) {
      console.error('Error converting canvas to data URL:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
