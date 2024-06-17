import { Response } from 'express';
export declare class DziController {
    getDziFile(filePath: string, res: Response): Promise<void | Response<any, Record<string, any>>>;
}
