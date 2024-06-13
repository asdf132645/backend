import { Response } from 'express';
export declare class ImagesService {
    constructor();
    getImageWbc(folder: string, imageName: string, res: Response): Promise<Response<any, Record<string, any>>>;
    private convertBmpToJpeg;
}
