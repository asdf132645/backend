import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCbcCodeDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CbcCodeItems)
  cbcCodeItems: CbcCodeItems[];
}

export class CbcCodeItems {
  @IsInt()
  id: number;

  @IsString()
  cd: string;

  @IsString()
  testCd: string;

  @IsString()
  testNm: string;

  @IsBoolean()
  isSelected: boolean;
}
