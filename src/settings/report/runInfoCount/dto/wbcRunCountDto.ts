import {
  IsString,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWbcRunCountDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WbcRunCountItems)
  wbcRunCountItems: WbcRunCountItems[];
}

export class WbcRunCountItems {
  @IsInt()
  num: number;

  @IsString()
  id: string;

  @IsInt()
  min: number;

  @IsInt()
  max: number;

  @IsInt()
  wbcCount: number;
}
