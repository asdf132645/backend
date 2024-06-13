import { Repository } from 'typeorm';
import { CellImgAnalyzed } from './entities/cell.entity';
import { CellImgAnalyzedDto } from './dto/create-cellImg.dto';
import { User } from '../../../user/entities/user.entity';
export declare class CellImgAnalyzedService {
    private readonly cellImgAnalyzedRepository;
    private readonly userRepository;
    constructor(cellImgAnalyzedRepository: Repository<CellImgAnalyzed>, userRepository: Repository<User>);
    create(dto: CellImgAnalyzedDto): Promise<CellImgAnalyzed>;
    find(): Promise<CellImgAnalyzed | undefined>;
    update(id: string, dto: CellImgAnalyzedDto): Promise<CellImgAnalyzed>;
    private findById;
}
