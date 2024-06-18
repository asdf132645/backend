import {
  IsString,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLisCodeRbcDto {
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
  fullNm: string;

  @IsString()
  key: string;
}
