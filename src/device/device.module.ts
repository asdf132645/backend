import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceEntity } from "./device.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  providers: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
