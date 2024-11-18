// sybase.proxy.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SybaseProxyService {
  constructor(private readonly httpService: HttpService) {}

  // CBC 결과 조회
  async getCbcResults(smp_no: string): Promise<any> {
    const url = `http://localhost:4000/cbc-results?smp_no=${encodeURIComponent(smp_no)}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  // UIMD 결과 저장
  async saveUimdResult(data: any): Promise<any> {
    const url = `http://localhost:4000/save-uimd-result`;
    const response = await firstValueFrom(this.httpService.post(url, data));
    return response.data;
  }

  async cbcImgGet(smp_no: string): Promise<any> {
    const url = `http://localhost:4000/cbcImgGet?smp_no=${encodeURIComponent(smp_no)}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async saveComment(data: any): Promise<any> {
    const url = `http://localhost:4000/save-comment`;
    const response = await firstValueFrom(this.httpService.post(url, data));
    return response.data;
  }
}
