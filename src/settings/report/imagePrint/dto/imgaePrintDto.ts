import {
  IsString,
  IsInt,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateImagePrintDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagePrintItems)
  imagePrintItems: ImagePrintItems[];
}

export class ImagePrintItems {
  @IsInt()
  id: number;

  @IsString()
  fullNm: string;

  @IsString()
  classId: string;

  @IsBoolean()
  checked: boolean;
}
