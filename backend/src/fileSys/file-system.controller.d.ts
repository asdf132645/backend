import { FileSystemService } from './file-system.service';
export declare class FileSystemController {
    private readonly fileSystemService;
    constructor(fileSystemService: FileSystemService);
    createFolder(body: {
        path: string;
    }): Promise<string>;
    deleteFolder(body: {
        path: string;
    }): Promise<string>;
}
