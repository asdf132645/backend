import { FileService } from './file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    readFile(path: string, filename: string): Promise<any>;
    createDirectory(directoryPath: string): string;
    createFile(body: {
        path: string;
        filename: string;
        content: string;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
}
