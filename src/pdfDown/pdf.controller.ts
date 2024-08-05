import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import * as htmlToPdf from 'html-pdf';
import * as zlib from 'zlib';
import axios from 'axios';
import * as sharp from 'sharp';

@Controller('pdf')
export class PdfController {
  @Post('convert')
  async convertHTMLToPDF(
    @Req() req: Request,
    @Body() body: { htmlContent: string },
    @Res() res: Response,
  ) {
    try {
      let htmlContent = body.htmlContent;

      // 요청 헤더에서 Content-Encoding 확인
      if (req.headers['content-encoding'] === 'gzip') {
        // 압축 해제
        htmlContent = await new Promise<string>((resolve, reject) => {
          const gunzip = zlib.createGunzip();
          let decompressed = '';

          req
            .pipe(gunzip)
            .on('data', (chunk: Buffer) => {
              decompressed += chunk.toString();
            })
            .on('end', () => {
              resolve(decompressed);
            })
            .on('error', reject);
        });
      }

      // 이미지 URL을 찾아서 미리 로드 및 압축
      const imgTagRegex = /<img[^>]+src="([^">]+)"/g;
      let match;
      const promises = [];

      while ((match = imgTagRegex.exec(htmlContent)) !== null) {
        const imageUrl = match[1];
        promises.push(
          axios
            .get(imageUrl, { responseType: 'arraybuffer' })
            .then((response) =>
              sharp(response.data).resize(800).jpeg({ quality: 80 }).toBuffer(),
            )
            .then((buffer) => {
              const base64Image = buffer.toString('base64');
              htmlContent = htmlContent.replace(
                imageUrl,
                `data:image/jpeg;base64,${base64Image}`,
              );
            })
            .catch((error) => {
              console.error(`Error loading image ${imageUrl}:`, error);
            }),
        );
      }

      await Promise.all(promises);

      // HTML 콘텐츠를 PDF로 변환
      const pdfOptions = {
        format: 'A4',
      };

      const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
        htmlToPdf.create(htmlContent, pdfOptions).toBuffer((error, buffer) => {
          if (error) {
            reject(error);
          } else {
            resolve(buffer);
          }
        });
      });

      // PDF 파일을 클라이언트로 전송
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="printed_document.pdf"',
      });
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error while converting HTML to PDF:', error);
      res
        .status(500)
        .send(`Error while converting HTML to PDF: ${error.message}`);
    }
  }
}
