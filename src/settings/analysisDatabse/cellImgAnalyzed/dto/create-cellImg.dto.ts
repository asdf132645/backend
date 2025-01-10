// create-cellImg.dto.ts
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CellImgAnalyzedDto {
  id?: number;
  analysisType: string;
  diffCellAnalyzingCount: string;
  pbsCellAnalyzingCount: string;
  bfCellAnalyzingCount: string;
  diffWbcPositionMargin: string;
  diffRbcPositionMargin: string;
  diffPltPositionMargin: string;
  stitchCount: string;
  edgeShotType: string;
  edgeShotLPCount: string;
  edgeShotHPCount: string;
  iaRootPath: string;
  isNsNbIntegration: boolean;
  isAlarm: boolean;
  alarmCount: string;
  keepPage: boolean;
  lisUploadCheckAll: boolean;
  backupPath: string;
  backupStartDate: Date;
  backupEndDate: Date;
  autoBackUpMonth: string;
  autoBackUpStartDate: Date;
  presetChecked: boolean;
  presetNm: string;
}
