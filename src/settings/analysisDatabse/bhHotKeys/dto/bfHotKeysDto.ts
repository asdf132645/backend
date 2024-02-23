import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBfHotKeysDto {
  @IsInt()
  @IsOptional()
  userId?: number;

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
  title: string;

  @IsString()
  name: string;

  @IsInt()
  count: number;

  @IsInt()
  percent: number;

  @IsString()
  key: string;

  @IsInt()
  order: number;
}
