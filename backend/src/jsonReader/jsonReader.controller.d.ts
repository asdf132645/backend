import { JsonReaderService } from './jsonReader.service';
export declare class JsonReaderController {
    private readonly jsonReaderService;
    constructor(jsonReaderService: JsonReaderService);
    getJsonFile(fullPath: string): Promise<any>;
    uploadFile(file: any, filePath: string): Promise<any>;
}
