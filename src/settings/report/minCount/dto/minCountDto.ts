import { IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMinCountDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => minCountItems)
  minCountItems: minCountItems[];
}

export class minCountItems {
  @IsInt()
  minGpCount: number;

  @IsInt()
  minPaCount: number;
}
