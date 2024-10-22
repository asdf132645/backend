import {
  IsArray,
  IsBoolean,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDeviceDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeviceDto)
  deviceItem: DeviceDto[];
}

export class DeviceDto {
  @IsInt()
  id: number;

  @IsString()
  siteCd: string;

  @IsString()
  deviceSerialNm: string;

  @IsString()
  pcIp: string;

  @IsBoolean()
  autoStart: boolean;
}
