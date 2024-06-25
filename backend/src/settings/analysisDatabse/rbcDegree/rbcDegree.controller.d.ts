import { RbcDegreeService } from './rbcDegree.service';
import { RbcDegreeDto } from './dto/rbcDegree.dto';
export declare class RbcDegreeController {
    private readonly rbcDegreeService;
    constructor(rbcDegreeService: RbcDegreeService);
    create(rbcDegreeDto: RbcDegreeDto[]): Promise<void>;
    update(updateRbcDegreeDto: RbcDegreeDto[]): Promise<RbcDegreeDto[]>;
    findOne(): Promise<RbcDegreeDto[]>;
    remove(): Promise<void>;
}
