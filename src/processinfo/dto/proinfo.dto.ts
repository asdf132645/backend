// proinfo.dto.ts

import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateProcessInfoDto {
  @IsString()
  cassetteNo: string;

  @IsString()
  barcodeId: string;

  @IsString()
  patientId: string;

  @IsString()
  patientName: string;

  @IsNumber()
  wbcCount: number;

  @IsDate()
  orderDate: Date;

  @IsNumber()
  oilOount: number;
}
