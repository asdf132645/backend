import { CategoryDto, RbcDegreeDto } from './dto/rbcDegree.dto';
import { RbcDegree } from './rbcDegree.entity';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
export declare class RbcDegreeService {
    private readonly rbcDegreeRepository;
    private readonly categoryRepository;
    constructor(rbcDegreeRepository: Repository<RbcDegree>, categoryRepository: Repository<Category>);
    create(rbcDegreeDto: RbcDegreeDto): Promise<void>;
    update(updateRbcDegreeDto: CategoryDto[]): Promise<RbcDegreeDto>;
    find(): Promise<RbcDegreeDto>;
    findAll(): Promise<RbcDegreeDto[]>;
    remove(): Promise<void>;
}
