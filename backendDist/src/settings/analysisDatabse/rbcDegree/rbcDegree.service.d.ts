import { RbcDegreeDto } from './dto/rbcDegree.dto';
import { RbcDegree } from './rbcDegree.entity';
import { Repository } from 'typeorm';
export declare class RbcDegreeService {
    private readonly rbcDegreeRepository;
    constructor(rbcDegreeRepository: Repository<RbcDegree>);
    create(rbcDegreeDto: RbcDegreeDto[]): Promise<void>;
    update(updateRbcDegreeDto: RbcDegreeDto[]): Promise<RbcDegreeDto[]>;
    private updateItem;
    find(): Promise<RbcDegreeDto[]>;
    remove(): Promise<void>;
}
