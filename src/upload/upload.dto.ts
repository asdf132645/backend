export class UploadDto {
  fileName: string;
  destinationUploadPath: string;
  originUploadPath: string;
  dayQuery: any;
  uploadType: 'copy' | 'move';
  projectType: 'bm' | 'pb';
}
