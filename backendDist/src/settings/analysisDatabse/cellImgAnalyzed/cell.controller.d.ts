import { CellImgAnalyzedDto } from './dto/create-cellImg.dto';
import { CellImgAnalyzedService } from './cell.service';
export declare class CellImgAnalyzedController {
    private readonly cellImgAnalyzedService;
    constructor(cellImgAnalyzedService: CellImgAnalyzedService);
    create(dto: CellImgAnalyzedDto): Promise<import("./entities/cell.entity").CellImgAnalyzed>;
    update(id: string, dto: CellImgAnalyzedDto): Promise<import("./entities/cell.entity").CellImgAnalyzed>;
    findByUserId(): Promise<import("./entities/cell.entity").CellImgAnalyzed>;
}
