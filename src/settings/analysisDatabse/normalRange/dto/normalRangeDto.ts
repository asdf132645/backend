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
  min: number;

  @IsInt()
  max: number;

  @IsInt()
  unit: string;

  @IsString()
  abbreviation: string;

  @IsString()
  fullNm: string;
}
