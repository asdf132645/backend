import { Controller, Post, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';

@Controller()
export class AppController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('/download-excel')
  async downloadExcel(@Res() res) {
    const data = [
      { name: 'John Doe', age: 30, email: 'john@example.com' },
      { name: 'Jane Doe', age: 25, email: 'jane@example.com' },
      // Add your data here
    ];

    await this.excelService.generateAndDownloadExcel(data, res);
  }
}
