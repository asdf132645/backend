import {
  IsString,
  IsInt,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCbcCodeDto {
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
  classCd: string;

  @IsString()
  fullNm: string;

  @IsBoolean()
  isSelected: boolean;
}
