import { Response, Request } from 'express';
export declare class PdfController {
    convertHTMLToPDF(req: Request, body: {
        htmlContent: string;
    }, res: Response): Promise<void>;
}
