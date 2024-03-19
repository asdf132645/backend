import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import * as htmlToPdf from 'html-pdf';

@Controller('pdf')
export class PdfController {
  @Post('convert')
  async convertHTMLToPDF(
    @Body() body: { htmlContent: string },
    @Res() res: Response,
  ) {
    try {
      const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
        htmlToPdf.create(body.htmlContent).toBuffer((error, buffer) => {
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
