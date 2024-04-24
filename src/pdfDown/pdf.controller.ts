import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import * as htmlToPdf from 'html-pdf';
import * as zlib from 'zlib';

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

          // 요청 본문을 압축 해제된 스트림으로 파이핑
          req
            .pipe(gunzip)
            .on('data', (chunk: Buffer) => {
              decompressed += chunk.toString();
            })
            .on('end', () => {
              // 압축 해제된 데이터에서 htmlContent 추출
              const parsedBody = JSON.parse(decompressed);
              resolve(parsedBody.htmlContent);
            })
            .on('error', reject);
        });
      }

      // HTML 콘텐츠를 PDF로 변환
      const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
        htmlToPdf.create(htmlContent).toBuffer((error, buffer) => {
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
      res.status(500).send('Error while converting HTML to PDF');
    }
  }
}
