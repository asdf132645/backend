import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { RTFService } from './rtf.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('rtf')
export class RTFController {
  constructor(private readonly rtfService: RTFService) {}

  @Post('convert')
  @UseInterceptors(FileInterceptor('htmlContent'))
  async convertHTMLToRTF(@Body() body: any): Promise<any> {
    return this.rtfService.convertHTMLToRTF(body.htmlContent);
  }
}
