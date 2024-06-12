import { RbcDegreeService } from './rbcDegree.service';
import { CategoryDto, RbcDegreeDto } from './dto/rbcDegree.dto';
export declare class RbcDegreeController {
    private readonly rbcDegreeService;
    constructor(rbcDegreeService: RbcDegreeService);
    create(rbcDegreeDto: RbcDegreeDto): Promise<void>;
    update(updateRbcDegreeDto: CategoryDto[]): Promise<RbcDegreeDto>;
    findOne(): Promise<RbcDegreeDto>;
    findAll(): Promise<RbcDegreeDto[]>;
    remove(): Promise<void>;
}
