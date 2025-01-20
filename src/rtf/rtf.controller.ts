import { Controller, Post, Body } from '@nestjs/common';
import { RTFService } from './rtf.service';

@Controller('rtf')
export class RTFController {
  constructor(private readonly rtfService: RTFService) {}

  @Post('convert')
  async convertHTMLToRTF(@Body() data: any): Promise<any> {
    return this.rtfService.convertHTMLToRTF(data);
  }
}
