import { Controller, Get, Query, Res } from '@nestjs/common';
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
  async getData(
    @Query() query: { [key: string]: string },
    // @Res() res: Response,
  ) {
    const data = await this.cbcService.fetchExternalData(query);
    // res.send(data)
    return data;
  }
}
