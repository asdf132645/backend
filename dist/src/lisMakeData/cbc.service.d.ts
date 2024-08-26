import { LoggerService } from '../logger.service';
export declare class CbcService {
    private readonly logger;
    constructor(logger: LoggerService);
    getMockCbcWorkList(): string;
    fetchExternalData(queryParams: {
        [key: string]: string;
    }): Promise<any>;
}
