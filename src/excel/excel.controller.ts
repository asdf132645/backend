import { Body, Controller, Post } from '@nestjs/common';
import { ExcelService } from './excel.service';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('execute')
  async executeApplication(@Body() body: any) {
    try {
      const result = await this.excelService.executeApplication(body);
      return { message: 'Application executed successfully', result };
    } catch (error) {
      return { message: 'Failed to execute application', error };
    }
  }
}
