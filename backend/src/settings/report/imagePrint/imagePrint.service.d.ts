import { Repository } from 'typeorm';
import { ImagePrintEntity } from './imagePrint.entity';
import { CreateImagePrintDto } from './dto/imgaePrintDto';
export declare class ImagePrintService {
    private readonly imagePrintEntityRepository;
    constructor(imagePrintEntityRepository: Repository<ImagePrintEntity>);
    create(createDto: CreateImagePrintDto): Promise<ImagePrintEntity>;
    update(updateDto: CreateImagePrintDto): Promise<ImagePrintEntity[]>;
    private updateItem;
    find(): Promise<ImagePrintEntity[]>;
}
