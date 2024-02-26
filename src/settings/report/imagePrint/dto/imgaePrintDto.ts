import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateImagePrintDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagePrintItems)
  imagePrintItems: ImagePrintItems[];
}

export class ImagePrintItems {
  @IsInt()
  id: number;

  @IsString()
  text: string;

  @IsString()
  value: string;

  @IsString()
  code: string;

  @IsBoolean()
  checked: boolean;
}
