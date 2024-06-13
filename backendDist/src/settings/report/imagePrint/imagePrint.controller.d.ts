import { ImagePrintService } from './imagePrint.service';
import { ImagePrintEntity } from './imagePrint.entity';
import { CreateImagePrintDto } from './dto/imgaePrintDto';
export declare class ImagePrintController {
    private readonly imagePrintService;
    constructor(imagePrintService: ImagePrintService);
    create(createDto: CreateImagePrintDto): Promise<ImagePrintEntity>;
    update(updateDto: CreateImagePrintDto): Promise<ImagePrintEntity[]>;
    get(): Promise<ImagePrintEntity[]>;
}
