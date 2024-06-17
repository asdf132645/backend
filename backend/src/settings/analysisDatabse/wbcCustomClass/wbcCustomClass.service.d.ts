import { Repository } from 'typeorm';
import { WbcCustomClass } from './wbcCustomClass.entity';
import { CreateWbcCustomClassDto, UpdateWbcCustomClassDto } from './dto/wbcCustomDto';
export declare class WbcCustomClassService {
    private readonly wbcCustomClassRepository;
    constructor(wbcCustomClassRepository: Repository<WbcCustomClass>);
    create(createDto: CreateWbcCustomClassDto): Promise<WbcCustomClass[]>;
    update(updateDto: UpdateWbcCustomClassDto): Promise<WbcCustomClass[]>;
    findAll(): Promise<WbcCustomClass[]>;
    find(): Promise<WbcCustomClass[]>;
}
