import {
  IsString,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFilePathSetDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilePathSetItems)
  filePathSetItems: FilePathSetItems[];
}

export class FilePathSetItems {
  @IsInt()
  id: number;

  @IsString()
  lisHotKey: string;

  @IsString()
  lisFilePath: string;

  @IsString()
  cbcFilePath: string;
}
