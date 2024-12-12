import { HttpService } from '@nestjs/axios';
export declare class SybaseProxyService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getCbcResults(smp_no: string): Promise<any>;
    saveUimdResult(data: any): Promise<any>;
    cbcImgGet(smp_no: string): Promise<any>;
    saveComment(data: any): Promise<any>;
}
