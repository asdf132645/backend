// create-cellImg.dto.ts
export class CellImgAnalyzedDto {
  id?: number;
  analysisType: string;
  cellAnalyzingCount: string;
  wbcPositionMargin: string;
  rbcPositionMargin: string;
  pltPositionMargin: string;
  pbAnalysisType2: string;
  stitchCount: string;
  bfAnalysisType: string;
  pbiaRootPath: string;
  isNsNbIntegration: boolean;
  isAlarm: boolean;
  alarmCount: string;
  keepPage: boolean;
  backupPath: string;
  backupStartDate: Date;
  backupEndDate: Date;
}
