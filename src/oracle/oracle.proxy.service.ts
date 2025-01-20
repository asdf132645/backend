import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OracleProxyService {
  constructor(private readonly httpService: HttpService) {}

  // UIMD RTS 결과 전송
  async sendRTS(data: any): Promise<any> {
    console.log('data', data);
    // const url = `http://localhost:3050/sendRTS`;
    // const response = await firstValueFrom(this.httpService.post(url, data));
    // return response.data;
  }
}