// backup.dto.ts
export class BackupDto {
  startDate: string; // 백업 시작일
  endDate: string; // 백업 종료일
  backupPath: string; // 백업 경로
  sourceFolderPath: string; // 옮겨져야 하는 폴더 위치
}
