import { Repository } from 'typeorm';
import { FilePathSetEntity } from './filePathSetEntity';
import { CreateFilePathSetDto } from './dto/filePathSetDto';
export declare class FilePathSetService {
    private readonly filePathSetEntityRepository;
    constructor(filePathSetEntityRepository: Repository<FilePathSetEntity>);
    create(createDto: CreateFilePathSetDto): Promise<FilePathSetEntity>;
    update(updateDto: CreateFilePathSetDto): Promise<FilePathSetEntity[]>;
    private updateItem;
    find(): Promise<FilePathSetEntity[]>;
}
