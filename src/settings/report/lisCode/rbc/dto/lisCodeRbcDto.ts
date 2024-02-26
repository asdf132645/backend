import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLisCodeRbcDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListCodeRbcDto)
  lisCodeItems: ListCodeRbcDto[];
}

export class ListCodeRbcDto {
  @IsInt()
  id: number;

  @IsString()
  categoryId: string;

  @IsString()
  categoryNm: string;

  @IsString()
  classId: string;

  @IsString()
  classNm: string;

  @IsString()
  code: string;
}
