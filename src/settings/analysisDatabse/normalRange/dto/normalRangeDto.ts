import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class NormalRangeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => normalRangeItems)
  normalRangeItems: normalRangeItems[];
}

export class normalRangeItems {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  classId: string;

  @IsString()
  min: string;

  @IsInt()
  max: string;

  @IsInt()
  unit: string;

  @IsString()
  title: string;

  @IsString()
  name: string;
}
