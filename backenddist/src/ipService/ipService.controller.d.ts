import { IpService } from './ipService.service';
export declare class IpController {
    private readonly ipService;
    constructor(ipService: IpService);
    getClientIp(req: any): string;
}
