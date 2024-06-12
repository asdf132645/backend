import { LisCodeRbcService } from './lisCodeRbc.service';
import { LisCodeRbcEntity } from './lisCodeRbc.entity';
import { CreateLisCodeRbcDto } from './dto/lisCodeRbcDto';
export declare class LisCodeController {
    private readonly lisCode;
    constructor(lisCode: LisCodeRbcService);
    create(createDto: CreateLisCodeRbcDto): Promise<LisCodeRbcEntity>;
    update(updateDto: CreateLisCodeRbcDto): Promise<LisCodeRbcEntity[]>;
    get(): Promise<LisCodeRbcEntity[]>;
}
