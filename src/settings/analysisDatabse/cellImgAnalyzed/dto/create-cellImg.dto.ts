// create-cellImg.dto.ts
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
  sideEdgeWbcMode: string;
  iaRootPath: string;
  isNsNbIntegration: boolean;
  isAlarm: boolean;
  alarmCount: string;
  keepPage: boolean;
  backupPath: string;
  backupStartDate: Date;
  backupEndDate: Date;
  autoBackUpMonth: string;
  autoBackUpStartDate: Date;
}
