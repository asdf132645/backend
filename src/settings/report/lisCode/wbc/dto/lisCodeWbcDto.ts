import {
  IsString,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLisCodeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListCodeDto)
  lisCodeItems: ListCodeDto[];
}

export class ListCodeDto {
  @IsInt()
  id: number;

  @IsString()
  classNm: string;

  @IsString()
  value: string;

  @IsString()
  code: string;
}
