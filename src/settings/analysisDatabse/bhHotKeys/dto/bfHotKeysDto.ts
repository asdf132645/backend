import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBfHotKeysDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BfHotKeysItems)
  bfHotKeysItems: BfHotKeysItems[];
}

export class BfHotKeysItems {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  abbreviation: string;

  @IsString()
  fullNm: string;

  @IsString()
  key: string;

  @IsInt()
  orderIdx: number;
}
