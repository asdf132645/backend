import { SybaseProxyService } from './sybase.proxy.service';
export declare class SybaseController {
    private readonly sybaseProxyService;
    constructor(sybaseProxyService: SybaseProxyService);
    getCbcResults(smp_no: string): Promise<any>;
    saveUimdResult(data: any): Promise<any>;
    cbcImgGet(data: any): Promise<any>;
    saveComment(data: any): Promise<any>;
}
