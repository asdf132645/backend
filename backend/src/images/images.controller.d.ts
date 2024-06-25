import { Response } from 'express';
import { ImagesService } from './images.service';
export declare class ImagesController {
    private readonly imagesService;
    private cacheService;
    constructor(imagesService: ImagesService);
    getImage(folder: string, imageName: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getImageRealTime(folder: string, imageName: string, res: Response): Response<any, Record<string, any>>;
    getImageWbc(folder: string, imageName: string, res: Response): Promise<void>;
    moveImage(sourceFolders: string, destinationFolders: string, imageNames: string, res: Response): Promise<Response<any, Record<string, any>>>;
    moveClassImage(sourceFolders: any, destinationFolders: any, imageNames: any, res: Response): Promise<Response<any, Record<string, any>>>;
    uploadImage(file: any): Promise<{
        imagePath: string;
    }>;
    cropImage(requestBody: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
