// src/excel.service.ts

import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';

@Injectable()
export class ExcelService {
  async generateAndDownloadExcel(data: any[], res: Response): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // 헤더 부분 삽입
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // 행추가
    data.forEach((row) => {
      const values = headers.map((header) => row[header]);
      worksheet.addRow(values);
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=export.xlsx');

    await workbook.xlsx.write(res);

    // End the response
    res.end();
  }
}
