import { SybaseProxyService } from './sybase.proxy.service';
export declare class SybaseController {
    private readonly sybaseProxyService;
    constructor(sybaseProxyService: SybaseProxyService);
    getCbcResults(smp_no: string): Promise<any>;
    saveUimdResult(data: any): Promise<any>;
    saveUimdCrcData(data: any): Promise<any>;
}
