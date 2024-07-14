import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class ExcelService {
  executeApplication(filesPath): Promise<string> {
    return new Promise((resolve, reject) => {
      const baseUrl =
        'D:\\UIMD_get_confusion_matrix\\Get_Confusion_Matrix\\Get_Confusion_Matrix.exe';
      const execDir = 'D:/UIMD_get_confusion_matrix/Get_Confusion_Matrix';
      const filesUrl = filesPath.join(' ');
      exec(
        `${baseUrl} ${filesUrl}`,
        { cwd: execDir },
        (error, stdout, stderr) => {
          if (error) {
            reject(`Error: ${error.message}`);
          } else if (stderr) {
            reject(`Stderr: ${stderr}`);
          } else {
            resolve(`Stdout: ${stdout}`);
          }
        },
      );
    });
  }
}
