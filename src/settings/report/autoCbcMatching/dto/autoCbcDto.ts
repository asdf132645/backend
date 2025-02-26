import { IsString, IsInt } from "class-validator";
import { Column } from "typeorm";

export class autoCbcItems {
  @IsInt()
  id: number;

  @IsString()
  cbc_code: string;

  @IsString()
  conditional: string;

  @IsString()
  mo_type: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  sex: string;

  @IsString()
  age: string;

  @IsString()
  ageCategory: string;

  @IsString()
  orderIdx?: string;
}
