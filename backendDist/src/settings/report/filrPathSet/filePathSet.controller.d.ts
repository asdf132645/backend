import { FilePathSetService } from './filePathSet.service';
import { FilePathSetEntity } from './filePathSetEntity';
import { CreateFilePathSetDto } from './dto/filePathSetDto';
export declare class FilePathSetController {
    private readonly filePathSetService;
    constructor(filePathSetService: FilePathSetService);
    create(createDto: CreateFilePathSetDto): Promise<FilePathSetEntity>;
    update(updateDto: CreateFilePathSetDto): Promise<FilePathSetEntity[]>;
    get(): Promise<FilePathSetEntity[]>;
}
