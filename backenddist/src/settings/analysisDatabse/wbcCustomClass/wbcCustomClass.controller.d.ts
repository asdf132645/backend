import { WbcCustomClassService } from './wbcCustomClass.service';
import { CreateWbcCustomClassDto, UpdateWbcCustomClassDto } from './dto/wbcCustomDto';
export declare class WbcCustomClassController {
    private readonly wbcCustomClassService;
    constructor(wbcCustomClassService: WbcCustomClassService);
    create(createDto: CreateWbcCustomClassDto): Promise<import("./wbcCustomClass.entity").WbcCustomClass[]>;
    update(updateDto: UpdateWbcCustomClassDto): Promise<import("./wbcCustomClass.entity").WbcCustomClass[]>;
    get(): Promise<import("./wbcCustomClass.entity").WbcCustomClass[]>;
}
