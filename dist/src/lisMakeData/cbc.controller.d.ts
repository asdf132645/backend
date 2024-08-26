import { CbcService } from './cbc.service';
import { Response } from 'express';
export declare class CbcController {
    private readonly cbcService;
    constructor(cbcService: CbcService);
    getCbcWorkList(spcParams: any, res: Response): void;
    getData(query: {
        [key: string]: string;
    }): Promise<any>;
}
