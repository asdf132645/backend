// src/wbc-hot-keys/dto/update-wbc-hot-keys.dto.ts
import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWbcHotKeysDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => wbcHotKeysItems)
  wbcHotKeysItems: wbcHotKeysItems[];
}

export class wbcHotKeysItems {
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
