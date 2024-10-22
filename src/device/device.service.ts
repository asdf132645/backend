import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceEntity } from './device.entity';
import { Repository } from 'typeorm';
import { CreateDeviceDto, DeviceDto } from './dto/deviceDto';
import { IsBoolean, IsString } from 'class-validator';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceEntityRepository: Repository<DeviceEntity>,
  ) {}

  async create(createDto: CreateDeviceDto): Promise<DeviceEntity> {
    const { deviceItem } = createDto as CreateDeviceDto;
    const deviceEntity = this.deviceEntityRepository.create({ ...deviceItem });
    const createdItem = await this.deviceEntityRepository.save(deviceEntity);
    return createdItem[0];
  }

  async find(): Promise<DeviceEntity[]> {
    return await this.deviceEntityRepository.find();
  }

  async update(deviceItems: DeviceDto): Promise<void> {
    const deviceItem = await this.deviceEntityRepository.find();
    const deviceItemKeys = Object.keys(deviceItems);
    for (const item of deviceItemKeys) {
      deviceItem[0][item] = deviceItems[item];
    }
    await this.deviceEntityRepository.save(deviceItem);
  }
}
