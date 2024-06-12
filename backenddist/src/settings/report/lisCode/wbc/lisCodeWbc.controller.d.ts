import { LisCodeWbcService } from './lisCodeWbc.service';
import { LisCodeWbcEntity } from './lisCodeWbc.entity';
import { CreateLisCodeDto } from './dto/lisCodeWbcDto';
export declare class LisCodeWbcController {
    private readonly lisCode;
    constructor(lisCode: LisCodeWbcService);
    create(createDto: CreateLisCodeDto): Promise<LisCodeWbcEntity>;
    update(updateDto: CreateLisCodeDto): Promise<LisCodeWbcEntity[]>;
    get(): Promise<LisCodeWbcEntity[]>;
}
