import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { CbcService } from './cbc.service';
import { Response } from 'express';

@Controller('cbc')
export class CbcController {
  constructor(private readonly cbcService: CbcService) {}

  @Get('/liveTest')
  getCbcWorkList(@Query() spcParams: any, @Res() res: Response): void {
    const xmlData = this.cbcService.getMockCbcWorkList();
    res.set('Content-Type', 'application/xml');
    res.send(xmlData);
  }

  @Get('/lisCbcMarys')
  async getData(@Query() query: { [key: string]: string }) {
    return await this.cbcService.fetchExternalData(query);
  }

  @Post('/executePostCurl')
  async executeCurlCommand(@Body() body: any, @Res() res: Response) {
    const result = await this.cbcService.executePostCurl(body);
    return res.json(result); // JSON 응답 반환
  }

  @Post('/executePostCurltest')
  async sss(@Body() body: any) {
    console.log(body);
    return 'ssssssss'; // JSON 응답 반환
  }
}
