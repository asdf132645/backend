export class DownloadDto {
  startDate: string; // 백업 시작일
  endDate: string; // 백업 종료일
  destinationDownloadPath: string; // 백업 경로
  originDownloadPath: string; // 옮겨져야 하는 폴더 위치
  downloadType: 'copy' | 'move';
  projectType: 'bm' | 'pb';
  dayQuery: any;
  deleteFileNames: string[];
}

export class DownloadReturn {
  success: boolean;
  message: string;
}
