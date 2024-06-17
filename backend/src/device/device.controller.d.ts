import { DeviceService } from './device.service';
import { DeviceEntity } from "./device.entity";
import { CreateDeviceDto } from "./dto/deviceDto";
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    create(createDto: CreateDeviceDto): Promise<DeviceEntity>;
    get(): Promise<DeviceEntity[]>;
}
