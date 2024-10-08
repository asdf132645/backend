import { IsNumber, IsOptional } from 'class-validator';

export class CreateCrcSettingDto {
  crcTitle: string;
  crcType: string;
  crcPercentText?: string;
  morphologyType: string;
  crcContent: string;
}
export class UpdateCrcSettingDto {
  @IsNumber()
  id: number;
  crcTitle: string;
  crcType: string;
  crcPercentText?: string;
  morphologyType: string;
  crcContent: string;
}
